function uploadSkin() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    if (file && file.type === "image/png") {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const site_url = window.location.toString().match(/(http|https):\/\/[^/]+/)[0];
                document.getElementById('url').value = `${site_url}${data.url}`;
                generateCommand();
            } else {
                alert('上传失败: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('上传出现错误，请重试。');
        });
    } else {
        alert('请选择一个有效的PNG文件。');
    }
}
