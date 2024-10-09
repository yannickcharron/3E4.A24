$(document).ready(() => {

    const inventory = JSON.parse(localStorage.getItem('inventory'));
    const color = localStorage.getItem('color');
    $('#clpColor').val(color);
    
    
    inventory.forEach(e => {
        const tag = displayElement(e);
        $('#inventory').append(tag)
    });

    $('.element-quantity').css('color', color);

    $('#txtName').val(localStorage.getItem('name'));

    $('#txtName').keyup(() => {
        const name = $('#txtName').val();
        localStorage.setItem('name', name);
    });

    $('#clpColor').on('change', () => {
        const color = $('#clpColor').val();
        localStorage.setItem('color', color);
        $('.element-quantity').css('color', color);
    });

});

function displayElement(element) {

    let elementTag = '<div class="col-2 mx-2 my-2">';
    elementTag += '<div class="card">';
    elementTag += '<div class="card-header">';
    elementTag += `<h4>${element.element}</h4>`;
    elementTag += '</div>';
    elementTag += '<div class="card-body">';
    elementTag += `<img src="https://assets.andromia.science/elements/${element.element}.png" alt="" class="element">`;
    elementTag += `<p class="element-quantity">${element.quantity}</p>`;
    elementTag += '</div>';
    elementTag += '</div>';
    elementTag += '</div>';

    return elementTag;
}