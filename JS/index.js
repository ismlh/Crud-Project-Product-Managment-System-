//get Elements

//#region variables declartion
    let Create=document.getElementById("Create");
    let Name=document.getElementById("ProductName");
    let Price=document.getElementById("Price");
    let Discount=document.getElementById("Discount");
    let Adds=document.getElementById("Adds");
    let Tax=document.getElementById("Tax");
    let total=document.getElementById("total");
    let Count=document.getElementById("Count");
    let Category=document.getElementById("Category");
    var itemsCounts=document.getElementById("itemsCount");

    let mood='create';

    let searchMood='title';
    let temp;
//#endregion


// array
var products;
if(localStorage.product==null)
{
    products=[];
}
else{
    products=JSON.parse(localStorage.product);
}
console.log(products);



//get Total Funcation
function getTotal()
{
    if(Price.value !='')
    {
        var totalPrice=(+Price.value + +Tax.value + +Adds.value)-
            +Discount.value;
        total.innerHTML=totalPrice;
    }
};

//Add Product Funcation
function addProduct()
{
    var productData={
        productName:Name.value.toLowerCase(),
        productPrice:Price.value,
        productAdds:Adds.value,
        productTax:Tax.value,
        productDiscount:Discount.value,
        productTotalPrice:total.innerHTML,
        productCategory:Category.value.toLowerCase(),
    };
    if(mood==='create')
    {
        if(Count.value>0)
        {
            for(var i=0;i<Count.value;i++)
            {
                products.push(productData);
            }
        }
        else{
            products.push(productData);

        }
    }
    else
    {
        products[temp].productName=Name.value;
        products[temp].productPrice=Price.value;
        products[temp].productAdds=Adds.value;
        products[temp].productTax=Tax.value;
        products[temp].productDiscount=Discount.value;
        products[temp].productTotalPrice=total.value;
        products[temp].productCategory=Category.value;
        Count.style.display='block';
        Create.innerHTML='Create New Product';
        mood='create';
    }
    //save local storage
    localStorage.setItem('product',JSON.stringify(products));

    showData();

    clearInputs();
};

//clear inputs  Funcation
function clearInputs()
{
    Name.value='';
    Price.value='';
    Tax.value='';
    Adds.value='';
    Discount.value='';
    Count.value='';
    Category.value='';
    total.innerHTML='';
};

//show Data
function showData()
{
    var table='';
    for(var i=0;i<products.length;i++)
    {
        table+=`
        <tr>
            <td>${i}</td>
            <td>${products[i].productName}</td>
            <td>${products[i].productPrice}</td>
            <td>${products[i].productTax}</td>
            <td>${products[i].productAdds}</td>
            <td>${products[i].productDiscount}</td>
            <td>${products[i].productTotalPrice}</td>
            <td>${products[i].productCategory}</td>
            <td><button id="update" class="btn btn-info" onclick="updateData(${i});" >Update</button></td>
            <td><button id="delete" class="btn btn-danger" onclick="deleteProduct(${i});" >Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    if(products.length==0)
    {
        itemsCounts.innerHTML='';
    }
    else
    {
        itemsCounts.innerHTML=`(${products.length})`;
    };
};
showData();

//deleteProduct
function deleteProduct(id)
{
    products.splice(id,1);
    localStorage.product=JSON.stringify(products);
    showData();
};

//delete All  Products 
function deleteAllProducts()
{
    products.splice(0);
    localStorage.clear();
    showData();
};

//update date
function updateData(id)
{
    Name.value=products[id].productName;
    Price.value=products[id].productPrice;
    Tax.value=products[id].productTax;
    Adds.value=products[id].productAdds;
    Discount.value=products[id].productDiscount;
    total.value=products[id].productTotalPrice;
    Category.value=products[id].productCategory;
    
    Create.innerHTML='Update Data';

    scroll({
        top:0,
        behavior:'smooth'
    });
    mood='update';
    temp=id;
    getTotal();
    Count.style.display='none';

};

//searchData

////getSearchMood
function getMood(id)
{
    let searchInput=document.getElementById('Search');
    searchInput.focus();
    if(id=='SearchTitle')
    {
        searchMood='title';
    }
    else{
        searchMood='category';
    }
    searchInput.placeholder=`Seaarch by ${searchMood}`;
}

function searchData(value)
{
    var table='';
    for(var i=0;i<products.length;i++)
    {
        if(searchMood == 'title')
        {
            if (products[i].productName.includes(value.toLowerCase()))
            {
                
                table+=`

                <tr>
                    <td>${i}</td>
                    <td>${products[i].productName}</td>
                    <td>${products[i].productPrice}</td>
                    <td>${products[i].productTax}</td>
                    <td>${products[i].productAdds}</td>
                    <td>${products[i].productDiscount}</td>
                    <td>${products[i].productTotalPrice}</td>
                    <td>${products[i].productCategory}</td>
                    <td><button id="update" class="btn btn-info" onclick="updateData(${i});" >Update</button></td>
                    <td><button id="delete" class="btn btn-danger" onclick="deleteProduct(${i});" >Delete</button></td>
                </tr>
                `
            }
        }
        else if (searchMood=='category'){
                if (products[i].productCategory.includes(value)) {
                    table+=`
                    <tr>
                        <td>${i}</td>
                        <td>${products[i].productName}</td>
                        <td>${products[i].productPrice}</td>
                        <td>${products[i].productTax}</td>
                        <td>${products[i].productAdds}</td>
                        <td>${products[i].productDiscount}</td>
                        <td>${products[i].productTotalPrice}</td>
                        <td>${products[i].productCategory}</td>
                        <td><button id="update" class="btn btn-info" onclick="updateData(${i});" >Update</button></td>
                        <td><button id="delete" class="btn btn-danger" onclick="deleteProduct(${i});" >Delete</button></td>
                    </tr>
                    `;
            };
        }
    document.getElementById('tbody').innerHTML=table;
    }
};