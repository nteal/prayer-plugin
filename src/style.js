//style.js
const style = {
root: {
  display: 'flex',
  flexWrap: 'wrap',
  // justifyContent: 'space-around',
},
gridList: {
  width: 300,
  height: 400,
  overflowY: 'auto',
  marginBottom: 24,
  cols: 2
},
 ideaBox: {
 width:'80vw',
 margin:'0 auto',
 fontFamily:'Helvetica, sans-serif'
 },
 title: {
 textAlign:'center',
 textTransform:'uppercase',
 },
 ideaList: {
//  border:'1px solid #f1f1f1',
 padding:'0 12px',
//  maxHeight:'70vh',
//  overflow:'scroll',
// 'column-count': '3'
 },
 idea: {
 // backgroundColor:'#fafafa',
 margin:'10px',
 padding:'3px 10px',
 // fontSize:'.85rem'
 },
 ideaForm: {
 margin:'10px',
 display:'flex',
 flexFlow:'row wrap',
 justifyContent:'space-between'
 },
 ideaFormAuthor: {
 minWidth:'150px',
 margin:'3px',
 padding:'0 10px',
 borderRadius:'3px',
 height:'40px',
 flex:'2'
 },
 ideaFormText: {
 flex:'4',
 minWidth:'400px',
 margin:'3px',
 padding:'0 10px',
 height:'40px',
 borderRadius:'3px'
 },
 ideaFormPost: {
 minWidth:'75px',
 flex:'1',
 height:'40px',
 margin:'5px 3px',
 fontSize:'1rem',
 backgroundColor:'#A3CDFD',
 borderRadius:'3px',
 color:'#fff',
 textTransform:'uppercase',
 letterSpacing:'.055rem',
 border:'none'
 },
 updateLink: {
 textDecoration:'none',
 paddingRight:'15px',
 fontSize:'.7rem'
 },
 deleteLink: {
 textDecoration:'none',
 paddingRight:'15px',
 fontSize:'.7rem',
 color:'red'
 }
}
module.exports = style;
