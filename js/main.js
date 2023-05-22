$(function(){
    let fondoOscuro = true;
    const gallery_images = ["images/gallery_1.jpg","images/gallery_2.jpg","images/gallery_3.jpg",
    "images/gallery_4.jpg","images/gallery_5.jpg","images/gallery_6.jpg",
    "images/gallery_7.jpg","images/gallery_8.jpg","images/gallery_9.jpg",
    "images/gallery_10.jpg","images/gallery_11.jpg","images/gallery_12.jpg"];
    const gallery_names = ["Gabe Newell","John Patrick Lowrie","Ellen McLain","Todd Howard",
    "Shigeru Miyamoto","Hayao Miyazaki","Jack Black","Stan Lee",
    "Richard Williams","Toby Fox","Hideaki Anno","Pendleton Ward"]
    $("#cambiarFondo1").click(function(){
        if (fondoOscuro === true){
            $("#resumen").css("background-color","#FFFFFF").css("color","#333333");
            fondoOscuro = false;
        }else if (fondoOscuro === false){
            $("#resumen").css("background-color","#000000").css("color","#CCCCCC");
            fondoOscuro = true;
        }
    })
    $("#cambiarFondo2").click(function(){
        if (fondoOscuro === true){
            $("#galería").css("background-color","#FFFFFF").css("color","#333333");
            fondoOscuro = false;
        }else if (fondoOscuro === false){
            $("#galería").css("background-color","#000000").css("color","#CCCCCC");
            fondoOscuro = true;
        }
    })
    $("#cambiarFondo3").click(function(){
        if (fondoOscuro === true){
            $("#videos").css("background-color","#FFFFFF").css("color","#333333");
            fondoOscuro = false;
        }else if (fondoOscuro === false){
            $("#videos").css("background-color","#000000").css("color","#CCCCCC");
            fondoOscuro = true;
        }
    })
    $("#reseñas .reseña").click(function(){
        console.log($(this).css("background-color"));
        if($(this).css("background-color") === "rgba(0, 0, 0, 0)"){
            $(this).css("background-color","rgba(0,0,0,0.1)");
        }
        else{
            $(this).css("background-color","rgba(0,0,0,0)");
        }
    })
    $("#reseñas h2 span").click(function(){
        $("#reseñas .reseña").css("background-color","rgba(0,0,0,0)");
    })
    $("#reseñas .reseña").mouseenter(function(){
        $(this).css("background-color","rgba(255, 255, 255, 0.2)");
    });
    $("#reseñas .reseña").mouseleave(function(){
        $(this).css("background-color","rgba(0, 0, 0, 0)");
    });
    $("section").each(function(){
        let titulo = $(this).find("h2").text();
        $("#menu-main").append(
            '<li class="nav-item">' +
            '<a class="nav-link" href="#' + titulo.toLowerCase() + '">' + titulo + '</a>' +
            '</li>'
        );
    })
    $("#galería figure").append("<figcaption>");
    $("#galería figure").mouseenter(function(){
        $(this).css("z-index",2);
    });
    $("#galería figure").mouseleave(function(){
        $(this).css("z-index",1);
    });
    $("#galería figure").each(function(){
        let nombre = $(this).find("img").attr("title");
        let index = $(this).find("img").attr("index");
        let img_src = $(this).find("img").attr("src");
        let imagen = gallery_images[index];
        $(this).find("figcaption").html("<div><i class='bi bi-zoom-in'></i>" + nombre + "</div>");
        $(this).find("figcaption").click(function(){
            $("#lightbox").fadeIn();
            $("body").css("overflow","hidden");
            $("#lightbox img").attr("src",imagen);
            $("#lightbox h3").text(nombre);
            $("#lightbox_next").click(function(){
                let currentImg = $.inArray($("#lightbox img").attr("src"),gallery_images);
                if (currentImg == 11){
                    $("#lightbox img").attr("src",gallery_images[0]);
                    $("#lightbox h3").text(gallery_names[0]);
                }else{
                    $("#lightbox img").attr("src",gallery_images[currentImg + 1]);
                    $("#lightbox h3").text(gallery_names[currentImg + 1]);
                }
            })
            $("#lightbox_previous").click(function(){
                let currentImg = $.inArray($("#lightbox img").attr("src"),gallery_images);
                if (currentImg == 0){
                    $("#lightbox img").attr("src",gallery_images[gallery_images.length - 1]);
                    $("#lightbox h3").text(gallery_names[gallery_names.length - 1]);
                }else{
                    $("#lightbox img").attr("src",gallery_images[currentImg - 1]);
                    $("#lightbox h3").text(gallery_names[currentImg - 1]);
                }
            })
        });
        $("#lightbox_exit").click(function(){
            $("#lightbox").fadeOut();
            $("body").css("overflow","visible");
        })

    });
    $(document).keyup(function(e){
        if (e.which == 27){
            $("#lightbox").fadeOut();
            $("body").css("overflow","visible");
        }else if (e.which == 37){
            let currentImg = $.inArray($("#lightbox img").attr("src"),gallery_images);
                if (currentImg == 0){
                    $("#lightbox img").attr("src",gallery_images[gallery_images.length - 1]);
                    $("#lightbox h3").text(gallery_names[gallery_names.length - 1]);
                }else{
                    $("#lightbox img").attr("src",gallery_images[currentImg - 1]);
                    $("#lightbox h3").text(gallery_names[currentImg - 1]);
                }
        }else if (e.which == 39){
            let currentImg = $.inArray($("#lightbox img").attr("src"),gallery_images);
                if (currentImg == 11){
                    $("#lightbox img").attr("src",gallery_images[0]);
                    $("#lightbox h3").text(gallery_names[0]);
                }else{
                    $("#lightbox img").attr("src",gallery_images[currentImg + 1]);
                    $("#lightbox h3").text(gallery_names[currentImg + 1]);
                }
        }
    })
    $("#favoritos-lista li").css("transition-duration","300ms");
    $("#favoritos-lista li.active").css("transition-duration","300ms");
    $("#favoritos-lista li").click(function(){
        $(".list-group-item").removeClass("active clicked");
        $(this).toggleClass("active clicked");
        let fileNameFav = $(this).attr("file");
        $.get(fileNameFav, function(data){
            $("#favorito_pag").html(data);
        })
    })
    $("#favoritos-lista li").mouseenter(function(){
        $(this).addClass("active");
        $(this).css("cursor","pointer");
    })
    $("#favoritos-lista li").mouseleave(function(){
        if (!$(this).hasClass("clicked")){
            $(this).removeClass("active");
        }
    })
})