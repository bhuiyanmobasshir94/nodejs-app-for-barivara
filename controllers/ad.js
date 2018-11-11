var express = require('express');
var router = express.Router()
var adModel = require.main.require('./models/ad-model');


router.get('/ad',function(req,res){

    
    res.render('ad/ad',{user:req.session.loggedUser});
    console.log('showing post ad page at '+req.ip);
});

router.get('/postAd',function(req,res){
    res.render('ad/postAd');
    console.log('showing post ad page at '+req.ip);
});

router.post('/postAd', function(req,res){
    var adToPost =[req.session.loggedUser.UserID,new Date().toLocaleString(),
        req.body.RentType,req.body.BedRoom, (req.body.SDDR) ? true:false, 
        req.body.Kitchen,req.body.Toilet,
        'Area:'+req.body.area+';Road:'+req.body.road+';House:'+req.body.house, req.body.des
    ];

    //for(var v in adToPost)console.log(adToPost[v]);
    adModel.insert(adToPost,function(result){
        res.redirect('/ad');
    })
});

router.get('/manageAds',function(req,res){
    adModel.getAll(function(result){
        res.render('ad/manageAds',{ads: result});
    });
});

router.get('/manageAds/:id',function(req,res){
    var postedBy = req.params.id;
    adModel.getById(postedBy, function(result){
        res.render('ad/manageAds',{ads: result});
    });
});

router.get('/delete/:id',function(req,res){
    var userID = req.params.id;
    adModel.delete(userID,function(result){
        res.redirect('/manageAds');
    });
});

router.get('/show/:id',function(req,res){
    var userID = req.params.id;
    adModel.get(userID,function(result){
        res.render('ad/show',{postedBy:result});
    });
});
router.get('/ad/details/:id',function(req,res){
    var postedBy = req.params.id;

    adModel.getById(postedBy, function(result){
        //res.render('ad/manageAds',{ads: result});
        console.log("Times Of Visit: " + result[0].TimesOfVisit);
        var data={
            TimesOfVisit: result[0].TimesOfVisit,
            PostedId:postedBy
        };

        adModel.updateTimesOfVisited(data, function(resultCount){
        res.render('ad/adDetails',{ads: result});
        //res.redirect('/barivara.com');
    });

    });

    
});


router.get('/contactLandlord/:id',function(req,res){
    if(req.session.loggedUser){
        var id=req.params.id;
        //var user=session.loggedUser;
        /*
        var data={
            landlordid:id,
            userId:user.userId
        };
        */
        res.redirect('/cTenant/send');
    }
    else{
        res.redirect('/login');
    }
});

router.get('/barivaraLogedIn/:id',function(req,res){
    adModel.getAll(function(result){
        res.render('barivaraLogedIn',{user:req.params.id,ads:result});
    });
});

router.get('/book',function(req,res){

});

module.exports = router;