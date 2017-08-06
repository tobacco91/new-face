var add = $('.add'),
    p_form = $('.p_form'),
    button = $('.button'),
    test_last = /\.png$|jpeg$|jpg$/,
    file = p_form.children[0],
    stuId = 2015210519,
    icon = $('.icon'),
    cover = $('.cover'),
    check_upload =  false;
            //console.log('upload')
    function chooseImg() {
        var value = file.value;
        if( test_last.test(value) ) {
            check_upload =  true;
            icon.style.display = 'none';
            add.style.backgroundImage = 'url('+ getFullSrc(file) +')';
            //console.log(1)
        } else {
            alert('只能上传png、jpeg、jpg格式');
            check_upload =  false;
        }
    }
   function getFullSrc (obj) {
    	return window.URL.createObjectURL(obj.files[0]);
    }
    function uploadImg() {
        if(!check_upload) return;
        var formData = new FormData(p_form);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/stuface_rebuild/public/index.php/index/index/uploadImage', true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
            }
        };
        formData.append('stuId', 2015210519);
        formData.append('image',file.files[0]);
        var stuId = formData.getAll('stuId')[0];
        var image = formData.getAll('image')[0];
        xhr.send('stuId='+stuId+'&image='+image);
        console.log('upload')
        cover.style.display = 'block';
        // ajax({
        //     method: 'post',
        //     url: '/stuface_rebuild/public/index.php/index/index/uploadImage',
        //     data: {
        //         stuId: stuId,
        //         image: formData
        //     },
        //     success: function(res) {
        //         console.log(res)
        //         // alert("上传成功,请等待管理员审核");
		// 		// window.history.back(-1);
        //     }
        // })
    } 
add.addEventListener('touchend',function() {
    file.click();
    
})
file.addEventListener('change',function() {
    chooseImg();
    //console.log(file.files[0]);
})
button.addEventListener('touchend',function() {
    uploadImg();
})