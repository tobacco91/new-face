var add = $('.add'),
    p_form = $('.p_form'),
    button = $('.button'),
    test_last = /\.png$|jpeg$|jpg$/,
    file = p_form.children[0],
    icon = $('.icon'),
    cover = $('.cover'),
    check_upload =  false;
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
        formData.append("uid", 'dadada');
        formData.append('file',file.files[0]);
        cover.style.display = 'block';
        ajax({
            method: 'post',
            url: ' ../file.php',
            info: 'form',
            data: formData,
            success: function(res) {
                alert("上传成功,请等待管理员审核");
                cover.display = 'none';
				window.history.back(-1);
            }
        })
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