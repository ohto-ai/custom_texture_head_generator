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
                document.getElementById('skin_url').value = `${site_url}${data.url}`;
                updateHeadPreview();
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

function health_check() {
    fetch('health_check')
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            document.getElementById('file_upload').style.display = 'none';
        }
    })
    .catch(error => {
        document.getElementById('file_upload').style.display = 'none';
    });
}

health_check();
