$(function () {
  // drawerjs
  $('.drawer').drawer()

  // smoothscroll
  // #から始まるURLがクリックされた時
  $('a[href^="#"]').click(function () {
    // 移動速度を指定（ミリ秒）
    let speed = 300;
    // hrefで指定されたidを取得
    let id = jQuery(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = jQuery("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = jQuery(target).offset().top;
    // ターゲットの位置までspeedの速度で移動
    jQuery("html, body").animate(
      {
        scrollTop: position - $('#js-header').outerHeight()
      },
      speed
    );
    return false;
  });

  // wow.js
  new WOW().init()

  // swiper
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      // 768px以上の場合
      768: {
        slidesPerView: 2.8,
        spaceBetween: 40,
      },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })

  // accordion
  $(function () {
    //中のコンテンツを隠す
    $(".accordion-content").css("display", "none");
    //タイトルがクリックされたら
    $(".js-accordion-title").click(function () {
      //クリックしたjs-accordion-title以外の全てのopenを取る
      $(".js-accordion-title").not(this).removeClass("open");
      //クリックされたtitle以外のcontentを閉じる
      $(".js-accordion-title").not(this).next().slideUp(300);
      //thisにopenクラスを付与
      $(this).toggleClass("open");
      //thisのcontentを展開、開いていれば閉じる
      $(this).next().slideToggle(300);
    });
  });

  // ==================
  // トップへ戻るボタン
  // ==================
  $(function () {
    var pagetop = $('#page_top');
    // ボタン非表示
    pagetop.hide();
    // 80px スクロールしたらボタン表示
    $(window).scroll(function () {
      if ($(this).scrollTop() > 80) {
        pagetop.fadeIn(300);
      } else {
        pagetop.fadeOut(300);
      }
    });
    pagetop.click(function () {
      $('body, html').animate({ scrollTop: 0 }, 500);
      return false;
    });
  });

  // googleform
  let $form = $('#js-form')
  $form.submit(function (e) {
    $.ajax({
      url: $form.attr('action'),
      data: $form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          $form.slideUp()
          $('#js-success').slideDown()
        },
        200: function () {
          //送信に失敗したときの処理
          $form.slideUp()
          $('#js-error').slideDown()
        }
      }
    });
    return false;
  });

  // formの入力確認
  let $submit = $('#js-submit')
  $('#js-form input, #js-form textarea').on('change', function () {
    if (
      $('#js-form input[type="text"]').val() !== "" &&
      $('#js-form input[type="email"]').val() !== "" &&
      $('#js-form input[name="entry.752976677"]').prop('checked') === true
    ) {
      // 全て入力された時
      $submit.prop('disabled', false)
      $submit.addClass('-active')
    } else {
      // 入力されていない時
      $submit.prop('disabled', true)
      $submit.removeClass('-active')
    }
  })
})
