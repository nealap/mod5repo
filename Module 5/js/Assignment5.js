function MenuChoice()
{
    if (document.getElementById("menu").value == "Customer List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Customer Order History")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "List of Customer Orders")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
}

function GetOrders()
{
    var clist = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    clist.onreadystatechange = function()
    {
        if (clist.readyState == 4 && clist.status == 200)
        {
            var output = JSON.parse(clist.responseText);
            GenerateOutput (output);
        }
    }
    
    clist.open("GET", url, true);
    clist.send();


    function GenerateOutput(result)
    {
        var display = "<table><tr><th>City</th><th>Company Name</th><th>Customer ID</th></tr>";
        var count = 0;
        var rowid = "oddrow";
        for(count = 0; count < result.GetAllCustomersResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllCustomersResult[count].City + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("cuslist").innerHTML = display;
    }
}

function CustHist()
            {
            var clist = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
            url += document.getElementById("custhisid").value;
                        
            clist.onreadystatechange = function() {
                if (clist.readyState == 4 && clist.status == 200) {
                    var output = JSON.parse(clist.responseText);
                    GenerateOutput(output);
                }
            }
            clist.open("GET", url, true);
            clist.send();
            
            function GenerateOutput(result)
            {
            var display = "<table><tr><th>Product Name</th><th>Total</th></tr>";
            var count = 0;
            for(count = 0; count < result.length; count ++)
            {
                if (count%2 == 0)
                {
                    rowid = "evenrow";
                }
                else
                {
                    rowid = "oddrow";
                }
                display += "<tr id=" + rowid + "><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("cushist").innerHTML = display;
            }
        }
        
function CustLisID()
    {
        var clist = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
            url += document.getElementById("ordid").value;
                        
            clist.onreadystatechange = function() {
                if (clist.readyState == 4 && clist.status == 200) {
                    var output = JSON.parse(clist.responseText);
                    GenerateOutput(output);
                }
            }
            clist.open("GET", url, true);
            clist.send();
            
            function GenerateOutput(result)
            {
            var display = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Shipped Date</th></tr>";
            var count = 0;
            for(count = 0; count < result.GetOrdersForCustomerResult.length; count ++)
            {
                if (count%2 == 0)
                {
                    rowid = "evenrow";
                }
                else
                {
                    rowid = "oddrow";
                }
                display += "<tr id=" + rowid + "><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("cuslis").innerHTML = display;
            }
    }