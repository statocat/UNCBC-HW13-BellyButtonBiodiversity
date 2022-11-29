d3.selectAll('body').on('change',updatePage);

function updatePage(){
    var menu = d3.selectAll('#charactersMenu').node();
    var menuID = menu.id;
    var selectedOption = menu.value;
    console.log(selectedOption);
};