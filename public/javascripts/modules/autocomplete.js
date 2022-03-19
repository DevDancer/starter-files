function autocomplete(input, latInput, lngInput) {

    if(!input) return;      // skip function if no input exists
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {

        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();

    });
    
    // stop default form submission behaviour
    input.on('keydown', (e) => {       // bling.js way of saying addEventListener

        if(e.keyCode === 13) e.preventDefault();
    
    });

}

export default autocomplete;