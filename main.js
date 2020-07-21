function printReceipt(barcodes) {
    
    var map=CountItemNum(barcodes)
}


module.exports = {
    printReceipt
};
function CountItemNum(barcodes){
    var map ={};
    for(var i=0;i<barcodes.length;i++)
    {
        var barcode =barcodes[i];
        if(!map[barcode])
        {
            map[barcode]=1;
        }
        else
        {
            map[barcode]++;
        }
    }
    return map;
    // for(var barcode in map)
    // {
    //     console.info(barcode+"-------"+map[barcode]);
    // }
    
}
function getItemInfo(map){
    var ItemPriceList=[
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
     ]
    var ItemInfoMap={}

}
console.log(`
***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 23 (yuan)
**********************`)