var choose = $('.choose');
var page = $('.page');
var list = $('.list');
var choose_two = $('.choose_two');
var zan = $('.zan');
var more = $('.more');
var stuId = localStorage.stuId;
var data_arr = [];
var pageLate = 1;
var type = 'comp';
var message = $('.message');
var cover = $('.cover');
var second = $('.second');
var success = $('.success');
var choose_info = false;
console.log(stuId)
//消息显示
message.addEventListener('touchstart',function() {
    ajax({
        method: 'get',
        url: '/stuface_rebuild/public/index.php/index/index/getStatus/stuId/'+stuId,
        success: function(res){
            success.children[1].innerHTML = '您的照片'+res.info;
            cover.style.display = 'block';
            success.style.display = 'block';
            second.style.display = 'block';
        }
    })
})
//page显示
ajax({
    method: 'get',
    url: '/stuface_rebuild/public/index.php/index/index/getPageNumber/sex/a',
    success: function(res) {
        for(var i = 1; i <= res.data; i++) {
            var li = document.createElement('li');
            li.innerHTML = i;
            page.appendChild(li);
        } 
        page.children[0].style.backgroundColor = '#f00078';
    }
})
//首页显示
ajax({
    method: 'get',
    url: '/stuface_rebuild/public/index.php/index/index/getPic/rank/comp/index/1/sex/a',
    success: function(res) {
        show_pic(res)
    }
})
$('.first').addEventListener('touchstart',function(){
    choose_two.style.display = 'block';
    if(!choose_info) {
        $('.first').children[1].className = 'iconfont icon-xiala1';
        $('.first').children[1].style.color = '#ffbc00';
        $('.first').children[0].style.color = '#ffbc00';
        choose_info = true;
    } else {
        return;
    }
})
//排序类型
choose_two.addEventListener('touchstart',function(e) {
        var target = e.target;
        while(target.tagName != 'LI'){
            target = target.parentNode;   
        }
        $('.first').children[1].className = 'iconfont icon-xiala';
        $('.first').children[1].style.color = '';
        $('.first').children[0].style.color = '';
        choose_info = false;
        $('.first').children[0].innerHTML = target.children[0].innerHTML;
        choose_two.style.display = 'none';
        ajax({
            method: 'get',
            url: '/stuface_rebuild/public/index.php/index/index/getPic/rank/'+target.getAttribute('name')+'/index/1/sex/a',
            success: function(res) {
                show_pic(res)
            }
        })
})
//点击页码
page.addEventListener('touchstart',function(e) {
    var target = e.target;
    if(pageLate ==  target.innerHTML) return;
    page.children[pageLate-1].style.backgroundColor = '#f87691';
    target.style.backgroundColor = '#f00078';
    pageLate = parseInt(target.innerHTML);
   ajax({
        method: 'get',
        url: '/stuface_rebuild/public/index.php/index/index/getPic/rank/'+ type +'/index/'+ target.innerHTML +'/sex/a',
        success: function(res) {
            show_pic(res)
        }
    })
})
//关闭
$('.close').addEventListener('touchstart',function() {
    $('.cover').style.display = 'none';
    $('.success').style.display = 'none';
    console.log(1)
})




//投票&&预览
list.addEventListener('touchstart',function(e) {
    var target;
    if(e.target.className == 'zan') {
        target = e.target;            
        ajax({
            method: 'get',
            url: '/stuface_rebuild/public/index.php/index/index/vote/stuId/'+ stuId +'/voteId/' +target.name,
            success: function(res) {
                cover.style.display = 'block';
                if(res.status === 200) {
                    var num = parseInt(target.nextSibling.innerHTML);
                    target.nextSibling.innerHTML = num + 1;
                    $('.success').style.display = 'block';
                    $('.success').children[1].innerHTML = '投票成功! 您还有 <span class="vote_num">'+ res.data +'</span> 次投票机会哟～';
                    //console.log(res)
                } else {
                    $('.success').style.display = 'block';
                    $('.success').children[1].innerHTML = res.info;
                }
            }
        }) 
    } else if(e.target.className == 'more') {
        target = e.target;
        var img_data = data_arr[target.alt];
        cover.style.display = 'block';
        document.body.style.overflow = 'hidden';
        var yulan = '<img class="big_person" src="'+img_data.pic+'" alt=""><p class="other"><span class="all">编号<span class="number">'+img_data.id+'</span></span><span class="zan_num_big">'+img_data.vote+'</span><img class="zan_big" name="'+ img_data.uid +'" src="../imgs/zan1.png" alt=""></p>';
        var div = document.createElement("div");
        div.className = 'show_more';
        div.innerHTML = yulan;
        $('.container').appendChild(div);
        //预览投票

        $('.zan_big').addEventListener('touchstart',function() {
            ajax({
                method: 'get',
                url: '/stuface_rebuild/public/index.php/index/index/vote/stuId/'+ stuId +'/voteId/' +$('.zan_big').name,
                success: function(res) {
                    $('.container').removeChild($('.show_more'));
                    if(res.status === 200) {
                        $('.success').style.display = 'block';
                        $('.vote_num').innerHTML = res.data;
                        console.log(res)
                    } else {
                        $('.success').style.display = 'block';
                        $('.success').children[1].innerHTML = res.info;
                        
                    }
                }
            }) 
        })
        //预览关闭
        $('.big_person').addEventListener('touchstart',function(){
            $('.cover').style.display = 'none';
            $('.container').removeChild($('.show_more'));
            console.log('yulancloe')
        })

    } else {
        return;
    }
})

$('.search_button').addEventListener('touchstart',function() {
    var value = $('.input').value;
    ajax({
        method: 'get',
        url:'/stuface_rebuild/public/index.php/index/index/getFaceById/id/'+ value,
        success: function(res) {
            if(res.status == 200) {
                list.innerHTML = '';
                var liParent = document.createElement('li');
                liParent.className = 'show';
                var li = '<span class="rank">No'+ res.data.id +'</span><img class="person" src="'+res.data.pic+'" alt=""><p class="other"><img class="zan" name="'+ res.data.uid  +'" src="../imgs/zan1.png" alt=""><span class="zan-num">'+ res.data.vote +'</span><img class="more" src="../imgs/more.png" alt="0"></p>';
                liParent.innerHTML = li;
                list.appendChild(liParent);
                data_arr = new Array(res.data);
            } else {
                alert(res.info);
            }
        }
    })
})
function show_pic(res) {
    list.innerHTML = '';
    data_arr = res.data;
    for(var i = 0; i < res.data.length; i++) {
        var liParent = document.createElement('li');
        liParent.className = 'show';
        var li = '<span class="rank">No'+ res.data[i].id +'</span><img class="person" src="'+res.data[i].pic+'" alt=""><p class="other"><img class="zan" name="'+ res.data[i].uid  +'" src="../imgs/zan1.png" alt=""><span class="zan-num">'+ res.data[i].vote +'</span><img class="more" src="../imgs/more.png" alt="'+ i +'"></p>';
        liParent.innerHTML = li;
        list.appendChild(liParent);
    }
}