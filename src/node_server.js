var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/api/hello', function(req, res){
var url ='mongodb://username:username10@ds049864.mlab.com:49864/payment_info';
	var s_name=req.query.fname +' '+req.query.lname;
	var s_grossI = Math.round(req.query.annual/12);
	var s_incomeT =0;
	var annual = req.query.annual;
	if(annual>=18201 && annual<=37000){
		s_incomeT = Math.round(0.19*(annual-18200)/12);
	}else if(annual>=37001 && annual<=87000){
		s_incomeT = Math.round( (3572+0.325*(annual-37000))/12 );
	}else if(annual>=87001 && annual<=180000){
		s_incomeT = Math.round((19822+0.37*(annual-87000))/12);
	}else if(annual>=180001){
		s_incomeT = Math.round((54232+0.45*(annual-180000))/12);
	}
	var s_netI = s_grossI - s_incomeT;
	var s_superA =Math.round(s_grossI*(req.query.rate/100) );
	mongo.connect(url,function(err,db){
		if(err) throw err;
		  var dbo = db.db("payment_info");
		if(err) throw err;
		var data ={firstname:req.query.fname,lastname:req.query.lname,annualsalary:req.query.annual,Interest:req.query.rate,date:req.query.date,s_name:s_name,s_grossI:s_grossI,s_incomeT:s_incomeT,s_netI:s_netI,s_superA:s_superA};
	
		dbo.collection('salary_slip').insertOne(data,function(err,res){
			if(err) throw err;
			console.log('inserted');
		});
		db.close();
		res.send({
			s_name:s_name,
			s_grossI:s_grossI,
			s_incomeT:s_incomeT,
			s_netI:s_netI,
			s_superA:s_superA,
			date:req.query.date
		})
	});
});

app.get('/api/getList',function(req,resp){
	var url ='mongodb://username:username10@ds049864.mlab.com:49864/payment_info';
	mongo.connect(url,function(err,db){
		if(err) throw err;
	  	var dbo = db.db("payment_info");
		if(err) throw err;
		  var param={},query={};
		  if(req.query.fname!=''){
		  	param ={
		  		s_name:1
		  	}
			query = {
			 s_name: req.query.fname
			};
		  }
		dbo.collection('salary_slip').find(query,param).toArray(function(err,res){
			if(err) throw err;
			resp.send({
				response:res
			})
		});
		db.close();
	});
});

app.listen(5019);