const refresh = 4000;

window.onload = function () {

    this.setTimeout(function () {

        const eTitle = document.getElementsByTagName('h1')[0];
        const eViews = document.getElementsByClassName('view-count style-scope yt-view-count-renderer')[0];
        const eDuration = document.getElementsByClassName('ytp-time-duration')[0];
        const eDate = document.getElementsByClassName('style-scope ytd-video-primary-info-renderer')[14];
        const eLikes = document.getElementsByClassName('style-scope ytd-toggle-button-renderer style-text')[1];
        const eDislikes = document.getElementsByClassName('style-scope ytd-toggle-button-renderer style-text')[3];
        const eComments = document.getElementsByClassName('count-text style-scope ytd-comments-header-renderer')[0];

        const eNextVideo = document.getElementsByClassName('yt-simple-endpoint style-scope ytd-compact-video-renderer');
        const eFirstNextVideo = eNextVideo[0];

        if (eNextVideo == null)
            location.reload();

        else if (eTitle == null || eViews == null || eDuration == null ||
            eDate == null || eLikes == null || eDislikes == null || eComments == null) {
            // const idNextVideo = Math.floor(Math.random() * 6);
            const idNextVideo = 0;
            window.location = eNextVideo[idNextVideo].href;
        }

        else {

            if (eLikes.getAttribute('aria-label') == null || eLikes.getAttribute('aria-label') == null) {

                const idNextVideo = Math.floor(Math.random() * 3);
                // const idNextVideo = 0;
                window.location = eNextVideo[idNextVideo].href;

            } else {

                const id = window.location.href.replace('https://www.youtube.com/watch?v=', '');
                const title = eTitle.innerText;
                const views = eViews.innerText.replace(/[^0-9]/g, '');
                const duration = eDuration.innerText;
                const date = eDate.innerText;
                const likes = eLikes.getAttribute('aria-label').replace(/[^0-9]/g, '');
                const dislikes = eLikes.getAttribute('aria-label').replace(/[^0-9]/g, '');
                const comments = eComments.innerText.replace(/[^0-9]/g, '');

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
                        window.location = eFirstNextVideo.href;
                    }
                }

            }

        }

    }, refresh);

}

