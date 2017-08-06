var choose = $('.choose');
var page = $('.page');
var list = $('.list');
var choose_two = $('.choose_two');
var zan = $('.zan');
var more = $('.more');
var stuId = '2014214054';
var before = '';
var pageLate = 1;
var type = 'comp';
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
//排序类型
choose.addEventListener('touchend',function(e) {
        choose_two.style.display = 'block';
        var target = e.target;
        while(target.tagName != 'LI'){
            target = target.parentNode;   
        }
        //console.log(target)
        if(target.className == 'first') {
            return;
        }
        if(before != '') {
            before.children[0].style.color = '#666666';
            before.children[1].className = '';
        }
        target.children[0].style.color = '#ffd86d';
        target.children[1].className = 'iconfont icon-gou';
        before = target;
        //console.log($('.first').children[0].innerHTML)
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
page.addEventListener('touchend',function(e) {
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
//toupiao
list.addEventListener('touchend',function(e) {
    var target;
    if(e.target.className == 'zan') {
        target = e.target;
        // if(target.alt == 0) {
        //     target.src = '../imgs/zan1.png';
        //     target.alt = 1;
        // } else if (target.alt == 1) {
        //     target.src = '../imgs/zan0.png';
        //     target.alt = 0;
        // }
                            
        ajax({
            method: 'get',
            url: '/stuface_rebuild/public/index.php/index/index/vote/stuId/'+ stuId +'/voteId/' +target.name,
            success: function(res) {
                if(res.status === 200) {
                    if(target.alt == 0) {
                        target.src = '../imgs/zan1.png';
                        target.alt = 1;
                    } else if (target.alt == 1) {
                        target.src = '../imgs/zan0.png';
                        target.alt = 0;
                    }
                    var num = parseInt($('.zan-num').innerHTML);
                    $('.zan-num').innerHTML = num + 1;
                } else {
                    alert(res.info);
                }
            }
        }) 
    } else if(e.target.className == 'more') {
        target = e.target;
    } else {
        return;
    }
})
//投票
// zan.addEventListener('touchend',function() {
//     console.log(this.name,1)
//     ajax({
//         method: 'get',
//         url: '/stuface_rebuild/public/index.php/index/index/getStatus/stuId/'+ stuId +'/voteId/' +this.name,
//         success: function(res) {
//             console.log(res)
//         }
//     })
// })
function show_pic(res) {
    list.innerHTML = '';
    for(var i = 0; i < res.data.length; i++) {
        var li = '<li class="show"><span class="rank">NO'+ res.data[i].id +'</span> <img class="person" src="'+res.data[i].pic+'" alt=""><p class="other"><img class="zan" name="'+ res.data[i].uid  +'" src="../imgs/zan0.png" alt="0"> <span class="zan-num">'+ res.data[i].vote +'</span><img class="more" src="../imgs/more.png" alt=""></p></li>';
        list.innerHTML += li;
    }
}