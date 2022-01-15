// import the data from data.js
const tableData = data;

// d3 is a JavaScript library that produces sophisticated and highly dynamic graphics in an HTML webpage
// it is oftern used by data professionals to create dashboars or collection of visual data for presentation

// reference the HTML table using d3
var tbody = d3.select("tbody");
// declare tbody
// use d3.select to tell javaScript to look for the <tbody> tags in the HTML

// Creating a new function to build table
function buildTable(data) {
    // We will clear the data first because we dont want to use existing data
    tbody.html(""); //use an empty string when creating the table.
    
    // we will use a arrow => function here because is cleaner
    data.forEach((dataRow) => {
        // tells JavaScript to find the <tbody> tag withnin the HTML and add a table row ("tr")
        let row = tbody.append("tr"); //("tr") tags are used for each row in a table

        // Object.values = to reference one object from the array of UFO sightings
        // adding (dataRow) = we want the values to fo into the dataRow
        // forEach((val) = specify that we want one object per row
        // telling our code put each sighting onto its own row of data.
        // val argument represents each item in the object such as location shape or duration
        Object.values(dataRow).forEach((val) => {
            // we set up the action of appending data into a table data tag <td>
            let cell = row.append("td");

            // holds only each value from the object
            cell.text(val);

        });

    });

}

// the whole function above accomplished:
    // looped through each object in the array
    // appended a row to the HTML table
    // added each value from the object into a cell

// D3 function Data-Driven Documents
function handleClick() {
    // .select() will select the very first element that matches our selector string: "#datetime"
    // d3.select("#datetime") tell d3 to look for the #datetime id in the HTML tags
    // eventhough we havent created our HTML yet, but we know the date value will be nested within tags that have an id of "datetime"
    // .property("value") tells D3 not only to look for where our date values are stored, but grab that info and hold it in the "date" variable
    let date = d3.select("#datetime").property("value");

    let filteredData = tableData; // our default filter will be the original table data

    // check if a date was entered and filter the data using that date
    if (date) {
        // filter(row => row.datetime === date) : applies the filter to the table data.
        // show only the rows where the date is equal to the date filter we created above.
        filteredData = filteredData.filter(row => row.datetime === date);

    };

    // Rebuild the table using the filtered data
    // if no date was entered, then filteredData will just be the default date
    buildTable(filteredData);
}

// Attach an event to listen for the form button
// we will assign a unique id to a button elemnet in the HTML called "filter-btn"
// .on("click", handleClick) tells D3 to execute our handleClick() when the button with an id of filter-btn is clicked
d3.selectAll("#filter-btn").on("click", handleClick);


// Build the table when the page loads
buildTable(tableData);