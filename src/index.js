import  React from 'react';
import ReactDOM from 'react-dom';

class Payslip extends React.Component{
	constructor(){
		super();
		this.state={data:[],listView:[]};
		this.listData = this.listData.bind(this);
		this.getFields = this.getFields.bind(this);
		this.getValues = this.getValues.bind(this);
	}
	getValues(){
		var fname=document.getElementById('fname').value;
		var lname=document.getElementById('lname').value;
		var annual=document.getElementById('annual').value;
		var rate=document.getElementById('rate').value;
		var date=document.getElementById('date').value;
		date = date.toString();
		if(fname==''||lname==''||parseInt(annual)<=0 || date==''){
			alert('Invalid Data please check!!');
			return;
		}
		var url = 'http://localhost:5019/api/hello?fname='+fname+'&lname='+lname+'&annual='+annual+'&rate='+rate+'&date='+date;
		fetch(url)
		.then(response=>response.json())
		.then(response=>{
			var DataList=[];
			DataList.push(<ul><li className="finallist" >{response.s_name }</li><li className="finallist" >{response.s_grossI }</li>
					<li className="finallist" >{response.s_incomeT }</li>
					<li className="finallist" >{response.s_netI }</li>
					<li className="finallist" >{response.s_superA }</li></ul>);
				document.querySelector('.listView').style.display='block';
				this.setState({listView:DataList});
							this.setState({data:DataList.concatenate(<li className="list" key={key} name={val.s_name} onClick={this.listData}>{val.s_name}</li>)});
		},this)
	}
	listData(event){
		document.querySelector('.textfield').style.display='none';
		document.querySelector('.button').style.display='block';
		document.querySelector('.listView').style.display='block';
		var name= event.currentTarget.getAttribute('name');
		if(document.querySelector('.left .selected')!=null){
			document.querySelector('.left .selected').classList.remove('selected');
		}
		event.currentTarget.classList.add('selected');
		var DataList=[];
		fetch('http://localhost:5019/api/getList?fname='+name)
		.then(response=>response.json())
		.then(response=>{
			Object.entries(response.response).map(function([key,val]){
				DataList.push(<ul><li className="finallist" >{val.s_name }</li><li className="finallist" >{val.s_grossI }</li>
					<li className="finallist" >{val.s_incomeT }</li>
					<li className="finallist" >{val.s_netI }</li>
					<li className="finallist" >{val.s_superA }</li></ul>);
			},this);
			this.setState({listView:DataList});
		},this);
	}
	componentWillMount(){

		var DataList=[];
		fetch('http://localhost:5019/api/getList?fname')
		.then(response=>response.json())
		.then(response=>{
			Object.entries(response.response).map(function([key,val]){
				DataList.push(<li className="list" key={key} name={val.s_name} onClick={this.listData}>{val.s_name}</li>);
			},this);
			this.setState({data:DataList});
		},this);
	}
	getFields(){
		document.querySelector('.textfield').style.display='block';
		if(document.querySelector('.left .selected')!=null){
			document.querySelector('.left .selected').classList.remove('selected');
		}
		document.querySelector('.listView').style.display='none';
	}
	render(){
		return(
		<div>
		  <div className="navbar">
			<center>
			<h1>Salary Slip</h1>
			</center>
			<input type="submit" className='button' onClick={this.getFields} value="Find New" style={{display:'none'}}/>
		  </div>
		  <div id="data" className="row">
			<div className="column left">
				<ul>
				{this.state.data}
				</ul>
			</div>
			<div className="column right">
				<label className='textfield' style={{display:''}}>
					First Name:
					<input className="foo" type='text' id="fname"/><br/><br/>
					Last Name:
					<input className="foo" type='text' id="lname"/><br/><br/>
					Annual Salary:
					<input className="foo" type='number' id="annual" min="0"/><br/><br/>
					Super Rate:
					<input className="foo" type='number' id="rate" min="0"/><br/><br/>
					Payment Start Date:
					<input className="foo" type='date' id="date"/><br/><br/>
					<input type="submit" onClick={this.getValues} value="submit" />
				</label>
				<label className='listView' style={{display:'none'}}>
					{this.state.listView}
				</label>
			</div>
		  </div>
		</div>
			);
	}
}
ReactDOM.render(<Payslip/>,document.getElementById('app'));