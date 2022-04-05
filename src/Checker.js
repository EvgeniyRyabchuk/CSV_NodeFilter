
class Checker {
    data; 
    filterArgs = { }; 

    constructor(data, filterArgs) {
        this.data = data; 
        this.filterArgs = filterArgs; 
    }

    cityCheck() {
        if(!this.filterArgs.city || this.filterArgs.city == [])  
            return true; 
            
        for(let i of this.filterArgs.city) {
            if(this.data.address_city == i) {
                return true;
            } 
        }

        return false; 
    }

    // substr  
    fullNameCheck() {
        if(!this.filterArgs.full_name || this.filterArgs.full_name == []) return true; 
        for(let i of this.filterArgs.full_name) {
            if(this.data.full_name.includes(i) || this.data.first_name.includes(i)) 
                return true;   
        }
        return false;
    }

    checkAll() {
        if(!this.filterArgs) true; 
        
        if(this.cityCheck() && this.fullNameCheck()) {
            return true; 
        }
        return false; 
    }

}


module.exports = Checker;   