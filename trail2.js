var fs = require("fs")
var enter = require("readline-sync")

class main_code{


    constructor(){
        this.maindict = JSON.parse(fs.readFileSync("/home/black_star/Documents/test/users.json","utf-8"))
        this.bike = JSON.parse(fs.readFileSync("/home/black_star/Documents/test/bike_data.json","utf-8"))
        this.subdict = {}
    }
    rent_bike(name,number){
        while (true){
            const gmail = enter.question("Enter Gmail-:")
            if (gmail.slice(gmail.length-10)==="@gmail.com" && gmail in this.maindict === false){
                const password = enter.question("Enter password:")
                const value_list = [name,number,password]
                const property_list = ["Name","Number","Password"]
                for (let i in value_list){
                    this.subdict[property_list[i]]=value_list[i]
                }
                this.bike_data()
                this.maindict[gmail]=this.subdict
                fs.writeFileSync("/home/black_star/Documents/test/users.json",JSON.stringify(this.maindict,null,6))
                break
            }
            else{
                console.log("Invalid gmail.");
            }
        }
    }

    bike_data(){
        var data = []
        let count = 0
        for (let j in this.bike){
            count++
            data.push(j)
            console.log(count+"."+j);
        }

        this.subdict["Time"]=new Date().getTime()

        var cho = enter.questionInt("\t\t\t\tEnter number-:")
        if (cho<=data.length){
            const data_list2 = []
            let count2 = 0
            for (let m in this.bike[data[cho-1]]){
                count2++
                data_list2.push(m)
                console.log(count2+".",m,"  rate:",this.bike[data[cho-1]][m][0],"  count:"+this.bike[data[cho-1]][m][1]);
            }
            
            
            const int = enter.questionInt("\t\t\t\tNumber of bikes you want-:")
            let bike_name = []
            let bike_rate = 0
            for (let q=0;q<int;q++){
                let chose_bike = enter.questionInt("Enter serial number of bike-:")
                if (data_list2.length>chose_bike){
                    bike_name.push(data_list2[chose_bike-1])
                    bike_rate+=this.bike[data[cho-1]][data_list2[chose_bike-1]][0]
                    this.bike[data[cho-1]][data_list2[chose_bike-1]][1] = this.bike[data[cho-1]][data_list2[chose_bike-1]][1]-1 ;
                }
                else{
                    console.log("Bike not available.");
                }
            }

            this.subdict["bike name"] = bike_name
            this.subdict["cost"]=bike_rate
            fs.writeFileSync("/home/black_star/Documents/test/bike_data.json",JSON.stringify(this.bike,null,8))
            console.log(("Bike Taken..."));
            
        }
        else console.log("choice out of range.");
    }

    return_bike(gmail,passwd){
        if (gmail in this.maindict){
            if (this.maindict[gmail]["Password"]===passwd){
                let m = this.maindict[gmail]["Time"]
                let fd = new Date().getTime()-m;
                console.log("perhour rate","$"+this.maindict[gmail]["cost"]);
                console.log("Time Taken",Math.floor(fd/360000),"HOURS");
                let money = Math.floor(fd/360000*this.maindict[gmail]["cost"])
                console.log("you have to pay","$"+money);

                let z = enter.question("\t\t\t\tEnter (1) to pay-:")
                while (true){
                    if (z==="1"){
                        
                        for (let k in this.bike){
                            for (let m in this.bike[k]){
                                for (let x of this.maindict[gmail]["bike name"]){
                                    if (x === m){
                                        this.bike[k][m]=[this.bike[k][x][0],this.bike[k][x][1]+1]; 
                                    }
                                }
                            }
                        }
                        if (this.maindict.hasOwnProperty(gmail)){
                            delete this.maindict[gmail]
                            fs.writeFileSync("/home/black_star/Documents/test/bike_data.json",JSON.stringify(this.bike,null,6))
                            console.log("Amount Paid.Thank you Sir.");
                            
                        }
                        break
                    }
                    else {
                        console.log("invlid input.");
                    }}
            }
            else{
                console.log("Incorrect password");
            }
        }
        else{
            console.log("Gmail not found");
        }
        
    fs.writeFileSync("/home/black_star/Documents/test/users.json",JSON.stringify(this.maindict,null,6))

    }

}



//remote control

let start = new main_code()
console.log("enter (help) to see options","(exit) to exit");

while (true){
    const choice = enter.question(">>>>")
    if(choice == "1"){
        const name = enter.question("Enter Name-:")
        const number = enter.questionInt("Enter Number-:")
        start.rent_bike(name,number)
    }else if(choice =="2"){
        const gmail = enter.question("Enter Gmail-:")
        const passwd = enter.question("Enter password-:")
        start.return_bike(gmail,passwd)
    }
    else if (choice=="help"){
        console.log("1.Rent bike\n2.Return bike");
    }
    else if (choice == "exit"){
        console.log("Have a great day sir.");
        break
    }
    else{
        console.log("Command not found.");
    }
}

