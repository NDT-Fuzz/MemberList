const User = (props) => {
    const [age,setAge] = React.useState(props.age)
    return (
        <div key={props.name}>
            name: {props.name},
            age: <input value={age}/> {props.age}<span></span>
        </div>
    )
}

const Member = (props) => {
    const {name, age, handleTransfer, renderExtend} = props;
    return <div>
        <span>name: {name}</span> - <span>age: {age} </span>
        <button onClick={() => handleTransfer()}>transfer</button>
        {renderExtend && renderExtend()}
    </div>
}

const INIT_DATA = {
    name: "",
    age: "",
    classType: "react"
}

const TransferMember = () => {
    const [reactMembers, setReactMember] = React.useState(() => {
        return [{
            name: "Đinh Tuấn Anh",
            age: 20,
        },
        {
            name: "Ngụy Minh Thắng",
            age: 21,
        },
        {
            name: "Nguyễn Anh Thư",
            age: 22,
        },
        ]
    });
    const [javaMembers, setJavaMember] = React.useState(() => {
        return [{
            name: "Bế Trọng Hiếu",
            age: 20,
        },
        {
            name: "Ngô Huỳnh Đức",
            age: 19,
        },
        {
            name: "Nguyễn Mạnh Dũng",
            age: 18,
        },
        ]
    });

    React.useEffect(() => {
        if (javaMembers.length ===0) {
            alert("WARNING: java class is empty now")
        } else if (reactMembers.length === 0) {
            alert("WARNING: react class is empty now")
        }
    } , [reactMembers.length, javaMembers.length])

    const transferReactToJavaMember = (index) => {
        const el = reactMembers[index];
        reactMembers.splice(index, 1);
        javaMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
    }
    const transferJavaToReactMember = (index) => {
        const el = javaMembers[index];
        javaMembers.splice(index, 1);
        reactMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
    }

    const [formData, setFormData] = React.useState(INIT_DATA)

    const handleInput = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            })
    }

   const handleSubmit = () => {
        if (formData.classType === 'react') {
            reactMembers.push(formData);
            setReactMember([...reactMembers])
        } else {
            javaMembers.push(formData)
            setJavaMember([...javaMembers])
        }
        setFormData(INIT_DATA)
   }

    return (
        <div>
            <h1>list member of React class</h1>
            {
                reactMembers.length > 0 ? reactMembers.map((user, index) => {
                    return <Member name={user.name} age={user.age} key={index}
                    handleTransfer={() => transferReactToJavaMember(index)}
                    />
                }) : "empty class"
            }

            <h1>list member of Java class</h1>
            {
                javaMembers.length > 0 ?javaMembers.map((user,index) => {
                    return <Member name={user.name} age={user.age} key={index}
                    handleTransfer={() => transferJavaToReactMember(index)}
                    />
                }) : "empty class"
            }

            <h1>Form add member</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <label>name </label>
                <input name="name" value={formData.name} onChange={(e) => handleInput(e)}></input>
                {" - "}
                <label>age </label>
                <input value={formData.age} name="age" onChange={(e) => handleInput(e)}></input>

                <select name="classType" onChange={(e) => handleInput(e)} value={formData.classType}>
                    <option value="react">React</option>
                    <option value="java">Java</option>
                </select>
                <br></br>
                <button>add member</button>
            </form>
        </div>
    )
};



ReactDOM.render(<div>
    <TransferMember />
    </div>, document.getElementById("react-id"));