(function(){
    const NBR_OF_BARS = 40
    //get the audio element tag
    const audio = document
    .querySelector("audio");
    //create an audio context
    const ctx = new AudioContext();
    //create an audio source
    const audioSource = ctx
    .createMediaElementSource(audio);

    const analyzer = ctx.createAnalyser();

    //connext the source, to the analyzer
    audioSource
    .connect(analyzer);
    audioSource
    .connect(ctx.destination);

    //Print th analyzer frequencies
    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer
    .getByteFrequencyData(frequencyData);
    
    //get visualizer container
    const visualizerContainer = document.querySelector('.visualizer-container');
    //create a set defined bars
    for(let i= 0; i < NBR_OF_BARS; i++){
        const bar = document.createElement('DIV')
        bar.setAttribute("id", "bar" + i)
        bar.setAttribute("class", "visualizer-container__bar")
        visualizerContainer.appendChild(bar)
    }
    function renderFrame(){
        //update our fraquency data array
        analyzer
        .getByteFrequencyData(frequencyData);

        for(let i = 0; i < NBR_OF_BARS; i++) {
            const index = (i+10)*2;
            const fd = frequencyData[index];
            const bar = document
            .querySelector("#bar" + i);
            if(!bar){
                continue;
            }
            const barHeight = Math.max(2,fd || 0);
            bar.style.height = barHeight + "px";
        }
        window
        .requestAnimationFrame(renderFrame)

    }
    
    renderFrame();
    audio.volume = 0.05;
    audio.play();

    

})();