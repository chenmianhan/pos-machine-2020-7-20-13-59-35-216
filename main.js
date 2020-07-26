function printReceipt(barcodes) {
    let barcodeInfoObjects=getBarcodeObjects(barcodes);
    let totalPrice=countTotalPrice(barcodeInfoObjects);
    console.log(genereteReceipt(barcodeInfoObjects,totalPrice));
}


module.exports = {
    printReceipt
};

function getBarcodeObjects(barcodes){
  let barcodeNumObjects=CountBarcodeNum(barcodes);
  return getBarcodeInfoObject(barcodeNumObjects);
}

function CountBarcodeNum(barcodes){
  let barcodeNumObjects ={};
  barcodes.forEach(barcode => {
    let barcodeNumObject={};
    if(!barcodeNumObjects[barcode])
      {
       
       barcodeNumObject["number"]=1;
       barcodeNumObject["barcode"]=barcode;
       barcodeNumObjects[barcode]=barcodeNumObject;
      }
      else
      {
        barcodeNumObjects[barcode]["number"]++;
      }
  });
  return barcodeNumObjects;
}
function getBarcodeInfoObject(barcodeNumObjects){
  let barcodeInfos=getBarcodeInfoFromDatabase();
  let barcodeInfoObjects=new Array();
  for(let key in barcodeNumObjects){
    let barcodeNumObject=barcodeNumObjects[key];
    let barcodeInfo = barcodeInfos.filter((barcodeInfo) => {
      return barcodeInfo["barcode"] ==barcodeNumObject["barcode"];
    });
     barcodeInfo=barcodeInfo[0];
    if(barcodeInfo!=null){
      barcodeNumObject["name"]=barcodeInfo["name"];
      barcodeNumObject["price"]=barcodeInfo["price"];
      barcodeInfoObjects.push(barcodeNumObject);
    }
    
  }
  
  return barcodeInfoObjects;

}
function getBarcodeInfoFromDatabase(){
  let barcodeInfos=[
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ];
 return barcodeInfos;

}
function countTotalPrice(barcodeInfoObjects){
  let totalPrice=0;
  barcodeInfoObjects.forEach(barcodeInfoObject => {

    totalPrice+=barcodeInfoObject["price"]*barcodeInfoObject["number"];
    
  });
  return totalPrice;
}

function genereteReceipt(barcodeInfoObjects,totalPrice){
  let receipt="";
  let header="***<store earning no money>Receipt ***\n";
  let goods="";
  barcodeInfoObjects.forEach(barcodeInfoObject => {
    let good="Name: %s, Quantity: %s, Unit price: %s (yuan), Subtotal: %s (yuan)\n"
    good=good.format(barcodeInfoObject["name"],barcodeInfoObject["number"],
    barcodeInfoObject["price"],barcodeInfoObject["price"]*barcodeInfoObject["number"]);
    goods+=good;
    
  });
  let total="Total: "+totalPrice+" (yuan)\n"
  let line="----------------------\n";
  let footer="**********************";
  receipt+="\n"+header+goods+line+total+footer;
  return receipt;
}
String.prototype.format= function(){
      let args = Array.prototype.slice.call(arguments);
      let count=0;
      //通过正则替换%s
      return this.replace(/%s/g,function(s,i){
          return args[count++];
      });
  }