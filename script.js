window.onload = function () {

    this.setTimeout(function () {

        const id = window.location.href.replace('https://www.youtube.com/watch?v=', '');
        const title = document.getElementsByTagName('h1')[0].innerText;
        const views = document.getElementsByClassName('view-count style-scope yt-view-count-renderer')[0].innerText.replace(/[^0-9]/g, '');
        const duration = document.getElementsByClassName('ytp-time-duration')[0].innerText;
        const date = document.getElementsByClassName('style-scope ytd-video-primary-info-renderer')[14].innerText;
        const likes = document.getElementsByClassName('style-scope ytd-toggle-button-renderer style-text')[1].getAttribute('aria-label').replace(/[^0-9]/g, '');
        const dislikes = document.getElementsByClassName('style-scope ytd-toggle-button-renderer style-text')[3].getAttribute('aria-label').replace(/[^0-9]/g, '');
        const comments = document.getElementsByClassName('count-text style-scope ytd-comments-header-renderer')[0].innerText.replace(/[^0-9]/g, '');

        // console.log('Title:', title);
        // console.log('Views:', views);
        // console.log('Duration:', duration);
        // console.log('Date:', date);
        // console.log('Likes:', likes);
        // console.log('Dislikes:', dislikes);
        // console.log('Comments:', comments);

        const Http = new XMLHttpRequest();
        const url = 'https://zaf.web.id/labs/youtube-metadata/store.php';

        Http.open('POST', url);
        Http.send(JSON.stringify([id, title, duration, date, views, likes, dislikes, comments]));

        Http.onreadystatechange = function () {
            if (Http.status == 200) {
                // console.log(Http.responseText);
                window.location = document.getElementsByClassName('yt-simple-endpoint style-scope ytd-compact-video-renderer')[0].href;
            }
        }

    }, 7000);

}

