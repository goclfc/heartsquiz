import React,{useState,useEffect} from "react";


const App=()=> {
  const [id,setId]=useState('')
  const [phone,setPhone]=useState('')
  const [showEnterButton,setShowEnterButton]=useState(false)
  const [showKeyInput,setShowKeyInput] = useState(false)
  const [usetInputKey,setUserInputKey] = useState('')
  const [key,setKey]=useState('')
  const [checkKey,setCheckKey]=useState(false)
  const [isVerified,setIsVerified]=useState(false)
  const [showResult,setShowResult]=useState(false)
  const handleIdEnter = (e)=>{
    setId(e.target.value)
  }
  const handlePhoneEnter = (e)=>{
    setPhone(e.target.value)
  }
  const handleEnterClick=(e)=>{
    //here we stoped, we need to fetch data 
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://phws2.aversi.ge:8088/api/SendVerificationCode?PersonalNumber=${id}&Phone=${phone}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setKey(result[0].verificationResult)
        setShowKeyInput(true)
      })
      .catch(error => console.log('error', error));
  }
  console.log(key)
  useEffect(()=>{
    if(id.length===11&&phone.length===9){
      setShowEnterButton(true)
    }else(setShowEnterButton(false))
  },[id,phone])
  const handleUserKeyInput = (e)=>{
    if(e.target.value==key){
      setIsVerified(true)

    }
  }
  const handleResponceClick = (e)=>{

      setShowResult(true)

  }
  return (
    <div className="App p-2 bg-heartsBg h-screen">
      <div className="header flex justify-center">
        <h1 className="text-3xl text-white m-2 p-2">ვიქტორინა</h1>
      </div>
      {!isVerified&&    
      <>
      <div className="about text-center text-white">
        <p className="text-xl m-2">გულების წამახალისებელი ვიქტორინა, გაიარეთ ვერიფიკაცია პირადი ნომრის და სისტემაში რეგისტრირებული მობილურის ნომრის მეშვებით</p>
        <p className="text-xl m-2">სისტემაში რეგისტრირებულ ნომერზე მოგივათ ვერიფიკაციის კოდი</p>
      </div>
      <div className="body flex justify-center">
      <input
        className="p-2 rounded-xl drop-shadow-xl m-2 text-center"
        type="text"
        placeholder="პირადი ნომერი"
        onChange={handleIdEnter}
      ></input>
      <input
        className="p-2 rounded-xl drop-shadow-xl m-2 text-center"
        type="text"
        placeholder="მობილურის ნომერი"
        onChange={handlePhoneEnter}
      ></input>
      </div>
      <div className="enter flex flex-col items-center m-2">
        {showEnterButton&&
        <button className="p-2 pr-8 pl-8 rounded-xl bg-green text-white hover:bg-lightGreen" onClick={handleEnterClick}> შესვლა </button>
        }
        {showKeyInput &&
          <input type='text' className='p-2 rounded-xl text-center m-2' placeholder="შეიყვანეთ კოდი" onChange={handleUserKeyInput}></input>
        }
      </div>
      </>
      }
        {isVerified&& !showResult&&
        <div className="quiz flex text-white flex-col">
          <div className="question text-center m-6 text-2xl">
          <p> ჩამოთვლილთაგან რომელია მამაკაცის მოვლის ბრენდი</p>
          </div>
          <div className="answers flex justify-center">
            <button className="p-2 rounded-xl m-2 text-white bg-green hover:bg-lightGreen" onClick={handleResponceClick} value='მენქეივი'>მენქეივი</button>
            <button className="p-2 rounded-xl m-2 text-white bg-green hover:bg-lightGreen" onClick={handleResponceClick} value='აჰავა'>აჰავა</button>
            <button className="p-2 rounded-xl m-2 text-white bg-green hover:bg-lightGreen" onClick={handleResponceClick} value='ლაკალუტი'>ლაკალუტი</button>
          </div>
        </div>
        }
        {showResult && <div className="text-center m-4 text-white"> თქვენი პასუხი მიღებულია. გამარჯვების შემთხვევაში მიიღებთ სმს</div>}
    </div>
  );
}

export default App;
