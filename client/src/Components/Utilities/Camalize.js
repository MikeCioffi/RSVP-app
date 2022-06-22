const Camalize =(str) =>{
        return str.split(' ').map(function(word,index){
          // upper case the first char and lowercase the rest.
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
      }

export default Camalize