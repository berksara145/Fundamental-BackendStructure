const { Router } = require('express');

const router = Router();

const gorceryList = [
    {
        item:'milk',
        quantity: 2
    }
 ];


router.get('/groceries',(req,res) => {
    res.send(gorceryList);
});

router.get('/:item',(req,res) => {
    const {item} = req.params;
    const groceryItem = gorceryList.find(g => {
        g.item === itme
    });
    response.send(200);
});

router.post('/',(req,res) => {
    console.log(req.body);
    gorceryList.push(req.body);
    res.send(201);
})

module.exports = router;