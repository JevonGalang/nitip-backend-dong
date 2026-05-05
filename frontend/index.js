
async function regist() {
    const inputname = document.getElementById("regname").value
    const inputpass = document.getElementById("regpass").value
    

    if(inputname === "" || inputpass === "") return alert("username dan password tidak boleh kosong");
    try{
       const response = await fetch("http://localhost:3000/post/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username:inputname,
            password:inputpass
        })

       } )

       const done = await response.json();
       console.log(done);
       
    }catch(error){
        console.log(error);
        
    }
}


async function login() {
    const inputname = document.getElementById("username").value
    const inputpass = document.getElementById("password").value
    
    if(inputname === "" || inputpass === "") return alert("username dan password tidak boleh kosong");

    try{
       const response = await fetch("http://localhost:3000/post/nyari/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username:inputname,
            password:inputpass
        })

       } )

       const done = await response.json();
       alert(done);
       
    }catch(error){
        console.log("error mas ", error);
        console.log(error);
        
        
    }
}