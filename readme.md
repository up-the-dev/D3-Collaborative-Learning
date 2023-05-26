For any project in D3, it makes sense to “Divide and Conquer” a complex task like this into manageable chunks. Follow along with these instructions, and make sure that you understand how each step works:

1. Load the data into your main.js file using the d3.csv() function. Make sure that you format the data, so that you can work with values as integers. Make a console log so that you can see the output of the data in the browser.

2. Add an SVG canvas to the #chart-area div element with a width of 600px and a height of 400px. Add a group for our SVG elements, and define some suitable margins for an x and y axis. 

3. Create the scales for our visualization. The x-axis should be an band scale, whilst our y-axis will be a linear scale.

4. Using D3 selectAll with the data, enter, and append methods, add a rectangle for each month of data that we have.

5. Scale the rectangles to have the correct width and height. Choose the right y-values so that they sit at the bottom of the visualization area.

6. Add in axes and labels, so that we can tell what the visualization is showing us.

7. Declare margins and width,height of the group
8. Create an svg with height and width considering the margins of group
9. Create group with height and width and translate it with margins
10. load data and now perform ops on this data
11. transform data to representable form
12. create scales (linear,band,ordinal,logarithmic,time)
13. create axes
    1. create using d3.axisPosition(scale)
    2. now create a group on main group and call this axis on it
14. create labels by appending text
15. g.selectAll("figure").data(data).enter().append("figure").attr("width","height","x","y","fill",(item,index)=>{
    return value;
    });
