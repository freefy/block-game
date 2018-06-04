var colors=['red','yellow','green','blue'];
var speed = 5;
var timer;
var flag = true;
var num=0;
var $main = $('.main');
init();

function init(){
    bindEvent();
}
function createRow(){  
    var oDiv = $('<div class="row"></div>');
    var index = Math.floor(Math.random()*4);
    for(var i = 0; i < 4;i++){
        var cDiv = $('<div></div>');
        oDiv.append(cDiv);
    }
    if($main.children().length==0){
        $main.append(oDiv);
    }else{
        oDiv.insertBefore($main.children().eq(0))
    }
    var clickDiv = oDiv.children().eq(index);
    clickDiv.css({backgroundColor:colors[index]});
    clickDiv.attr('class','i');
}
function move(){
    clearInterval(timer);
    // $this= $('this');
    timer = setInterval(function(){
        slide();
    },20)
    // bindEvent();
}
function slide(){
    var step = parseInt($main.css('top'))+speed;
    $main.css({'top':step});
    if(parseInt($main.css('top'))>=0){
        createRow();
        $main.css({'top':'-150px'});
    }
    var len = $main.children().length;
    // var lent = $main.children()[0].children().length;
    if(len==6){
        for(var i = 0 ; i <4;i++){
            if($main.children().eq(len-1).children().eq(i).hasClass('i')){
                alert('游戏结束，得分：'+num);
                $('.stop').hide();
                $('.restart').show();
                clearInterval(timer);
                flag = false;
            }
               
        }
        $main.children().eq(len-1).remove();
    }
}
function bindEvent(){
    $main.on('click',function(event){
        if(flag){
        var tar = event.target;
        if($(tar).hasClass('i')){
            $(tar).removeClass('i');
            $(tar).css({backgroundColor:'grey'});

            $('.score').html('分数:'+ ++num);

        }else{
            alert('游戏结束，得分：'+num);
            // console.log('a');
            $('.stop').hide();
                $('.restart').show();
            clearInterval(timer);
            flag = false;
        }
        if (num % 10 == 0) {
            speed++;
        }
    }
    })
    $('.start').on('click',function(){ 
        $('.start').hide();
        $('.stop').show();
        move();
       
    })
    $('.continue').on('click',function(){  
        
        $('.stop').show();
        $('.continue').hide();
       if(flag == false){
      
           flag =true;
          timer = setInterval(function(){
        slide();
    },20) 
       }
    })
    $('.stop').on('click',function(){
    
        if(flag){
            clearInterval(timer);
        flag =false;
        $('.continue').show();
        $('.stop').hide();
    }
    
    })
    $('.restart').on('click',function(){
        $main.html('');
        $main.css({'top':'-150px'});
        timer = null;
        speed = 5;
        num =0;
        flag = true;
        $('.score').html('分数:'+num);
        timer = setInterval(function(){
            slide();
        },20)
        $('.restart').hide();
        $('.stop').show();
    })
}