export const  checkValidity = (value, rules) =>{
    let validity = true;

    if(!rules){
        return true;
    }

    if(rules.required){
      validity = value.trim() !=='' && validity;
    }
    if(rules.minLength){
      validity = value.length >= rules.minLength;
    }
    if(rules.isEmail){
        const pattern = /\S+@\S+\.\S+/;
        validity = pattern.test(value) && validity;
    }
    return validity;
  }