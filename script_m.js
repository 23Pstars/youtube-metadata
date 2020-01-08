const refresh = 500;

window.onload = function () {

    this.setTimeout(function () {

        const Http = new XMLHttpRequest();
        const url = 'https://zaf.web.id/labs/yt-meta/get_m.php';

        try {

            let playerConfig = document.getElementsByTagName('script')[11].innerHTML;
            playerConfig = playerConfig.match('ytInitialPlayerConfig = {(.+?)};')[1];
            playerConfig = JSON.parse("{" + playerConfig + "}");

            let playerResponse = JSON.parse(playerConfig.args.player_response);

            let initialData = document.getElementById('initial-data').innerHTML;

            initialData = initialData.replace('<!-- ', '');
            initialData = initialData.replace(' -->', '');
            initialData = JSON.parse(initialData);

            const id = playerResponse.videoDetails.videoId;
            const title = playerResponse.videoDetails.title;
            const views = playerResponse.videoDetails.viewCount;
            const duration = playerResponse.videoDetails.lengthSeconds;
            const publish = playerResponse.microformat.playerMicroformatRenderer.publishDate;
            const likes = initialData.contents.singleColumnWatchNextResults.results.results.contents[1].itemSectionRenderer.contents[0].slimVideoMetadataRenderer.buttons[0].slimMetadataToggleButtonRenderer.button.toggleButtonRenderer.toggledText.accessibility.accessibilityData.label.replace(/[^0-9]/g, '');
            const dislikes = initialData.contents.singleColumnWatchNextResults.results.results.contents[1].itemSectionRenderer.contents[0].slimVideoMetadataRenderer.buttons[1].slimMetadataToggleButtonRenderer.button.toggleButtonRenderer.toggledText.accessibility.accessibilityData.label.replace(/[^0-9]/g, '');
            const comments = document.getElementsByClassName('comment-section-header-text')[0].innerText.replace(/[^0-9]/g, '');

            // console.log('Title:', title);
            // console.log('Views:', views);
            // console.log('Duration:', duration);
            // console.log('Publish:', publish);
            // console.log('Likes:', likes);
            // console.log('Dislikes:', dislikes);
            // console.log('Comments:', comments);


            Http.open('POST', url + '?store');
            Http.send(JSON.stringify([title, duration, publish, views, likes, dislikes, comments, id]));

            Http.onreadystatechange = function () {
                if (Http.readyState === XMLHttpRequest.DONE) {
                    const response = JSON.parse(Http.responseText);
                    if (typeof response.id !== 'undefined')
                        window.location = 'https://m.youtube.com/watch?v=' + response.id;
                    // console.log(response.id);
                }
            }

        } catch (err) {

            console.log(err);

            Http.open('GET', url);
            Http.send();

            Http.onreadystatechange = function () {
                if (Http.readyState === XMLHttpRequest.DONE) {
                    const response = JSON.parse(Http.responseText);
                    if (typeof response.id !== 'undefined')
                        window.location = 'https://m.youtube.com/watch?v=' + response.id;
                    // console.log(response.id);
                }
            }

        }

    }, refresh);

}