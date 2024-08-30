#!/usr/bin/env python3
from flask import Flask, request, jsonify, send_from_directory
import hashlib
import os
import uuid

app = Flask(__name__)

# 配置上传文件夹
UPLOAD_FOLDER = '/opt/public/mc/skins'
STATIC_FOLDER = 'static'

# 确保上传文件夹存在
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(STATIC_FOLDER):
    os.makedirs(STATIC_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(success=False, message="No file part"), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify(success=False, message="No selected file"), 400

    if file and file.filename.lower().endswith('.png'):
        # 计算md5防止重复
        md5 = hashlib.md5()
        md5.update(file.read())
        file.seek(0)
        md5 = md5.hexdigest()
        filename = f"{md5}.png"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        if not os.path.exists(filepath):
            file.save(filepath)
        file_url = f"/uploads/{filename}"
        return jsonify(success=True, url=file_url)
    
    return jsonify(success=False, message="Invalid file type"), 400

# 提供静态资源服务
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/<path:filename>')
def static_file(filename):
    return send_from_directory(STATIC_FOLDER, filename)

@app.route('/health_check', methods=['GET', 'POST'])
def health():
    return jsonify(success=True)

@app.route('/', methods=['GET'])
def index():
    return send_from_directory(STATIC_FOLDER, 'index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8050, debug=True)
