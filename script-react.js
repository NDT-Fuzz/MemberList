const divTag = document.getElementById("react-id");

function ListMember() {
    const [listReact, setListReact] = React.useState(JSON.parse(localStorage.getItem('listReact')) || [
        { name: "Đinh Tuấn Anh", age: 16, memberClass: "react" },
        { name: "Ngụy Minh Thắng", age: 20, memberClass: "react" },
        { name: "Nguyễn Anh Thư", age: 21, memberClass: "react" }
    ]);
    const [listJava, setListJava] = React.useState(JSON.parse(localStorage.getItem('listJava')) || [
        { name: "Bế Trọng Hiếu", age: 19, memberClass: "java" },
        { name: "Ngô Huỳnh Đức", age: 20, memberClass: "java" },
        { name: "Nguyễn Mạnh Dũng", age: 21, memberClass: "java" }
    ]);
    const [dataMember, setDataMember] = React.useState({
        name: "",
        age: "",
        memberClass: "react"
    });
    const [editIndex, setEditIndex] = React.useState();
    const [searchName, setSearchName] = React.useState("");

    React.useEffect(() => {
        if (listReact.length === 0)
            alert('Warning: React class is empty now')
        else if (listJava.length === 0)
            alert('Warning: Java class is empty now')
    }, [listReact, listJava])

    const transferMember = (e) => {
        if (e.memberClass === "react") {
            e.memberClass = "java";
            const new_arr = listReact.filter(item => item.memberClass !== "java");
            setListReact(new_arr);
            setListJava([...listJava, e]);
            localStorage.setItem('listReact', JSON.stringify(new_arr));
            localStorage.setItem('listJava', JSON.stringify([...listJava, e]));
        }
        else {
            e.memberClass = "react";
            const new_arr = listJava.filter(item => item.memberClass !== "react");
            setListJava(new_arr);
            setListReact([...listReact, e]);
            localStorage.setItem('listReact', JSON.stringify([...listReact, e]));
            localStorage.setItem('listJava', JSON.stringify(new_arr));
        }
    }
    const setName = (e) => {
        setDataMember({ ...dataMember, name: e.target.value });
    }
    const setAge = (e) => {
        setDataMember({ ...dataMember, age: e.target.value });
    }
    const setClass = (e) => {
        setDataMember({ ...dataMember, memberClass: e.target.value });
    }
    const addNewMember = () => {
        if (dataMember.memberClass === "react") {
            setListReact([...listReact, dataMember]);
            localStorage.setItem('listReact', JSON.stringify([...listReact, dataMember]));
        }
        else {
            setListJava([...listJava, dataMember]);
            localStorage.setItem('listJava', JSON.stringify([...listJava, dataMember]));
        }
        setDataMember({
            name: "",
            age: "",
            memberClass: "react"
        })
    }
    const handleEditClick = (e, i) => {
        setDataMember({
            name: e.name,
            age: e.age,
            memberClass: e.memberClass
        })
        setEditIndex(i);
    }
    const editMember = () => {
        if (dataMember.memberClass === "react") {
            listReact[editIndex] = dataMember;
            setListReact([...listReact]);
        }
        else {
            listJava[editIndex] = dataMember;
            setListJava([...listJava]);
        }
        localStorage.setItem('listReact', JSON.stringify(listReact));
        localStorage.setItem('listJava', JSON.stringify(listJava));
        setDataMember({
            name: "",
            age: "",
            memberClass: "react"
        })
    }
    const sortMember = () => {
        setListReact([...listReact.sort((a, b) => {
            if (parseInt(a.age) > parseInt(b.age))
                return 1;
            if (parseInt(a.age) < parseInt(b.age))
                return -1;
            return 0;
        })]);
        setListJava([...listJava.sort((a, b) => {
            if (parseInt(a.age) > parseInt(b.age))
                return 1;
            if (parseInt(a.age) < parseInt(b.age))
                return -1;
            return 0;
        })]);
    }
    
    const setSearchNameMember = (e) => {
        setSearchName(e.target.value);
    }
    const searchMember = () => {
        if(searchName !== ""){
            const searchListReact = listReact.filter((e) => {
                return e.name.toLowerCase().includes(searchName);
            })
            localStorage.setItem('searchListReact', JSON.stringify(searchListReact));
            setListReact(JSON.parse(localStorage.getItem('searchListReact')));

            const searchListJava = listJava.filter((e) => {
                return e.name.toLowerCase().includes(searchName);
            })
            localStorage.setItem('searchListJava', JSON.stringify(searchListJava));
            setListJava(JSON.parse(localStorage.getItem('searchListJava')));
        }
        else{
            setListReact(JSON.parse(localStorage.getItem('listReact')));
            setListJava(JSON.parse(localStorage.getItem('listJava')));
        }
    }

    const deleteMember = (e, i) => {
        if(e.memberClass === "react"){
            listReact.splice(i, 1)
            setListReact([...listReact]);
            localStorage.setItem('listReact', JSON.stringify(listReact));
        }
        else{
            listJava.splice(i, 1)
            setListjava([...listJava]);
            localStorage.setItem('listJava', JSON.stringify(listJava));
        }
    }

    return (
        <div>
            <div className="list-react">
                <h2 className="title">list member of React class</h2>
                {
                    listReact.length > 0 ? listReact.map((value, index) => {
                        return (
                            <div key={value.name}>name: {value.name} - age: {value.age}
                                <button onClick={() => transferMember(value)}>transfer</button>
                                <button onClick={() => handleEditClick(value, index)}>edit</button>
                                <button onClick={() => deleteMember(value, index)}>delete</button>
                            </div>
                        )
                    }) : "empty class"
                }
            </div>
            <div className="list-java">
                <h2 className="title">list member of Java class</h2>
                {
                    listJava.length > 0 ? listJava.map((value, index) => {
                        return (
                            <div key={value.name}>name: {value.name} - age: {value.age}
                                <button onClick={() => transferMember(value)}>transfer</button>
                                <button onClick={() => handleEditClick(value, index)}>edit</button>
                                <button onClick={() => deleteMember(value, index)}>delete</button>
                            </div>
                        )
                    }) : "empty class"
                }
            </div>
            <div className="form-add-member">
                <h2 className="title">Form add member</h2>
                <label htmlFor="name">name </label>
                <input onChange={setName} name="name" value={dataMember.name} type="text"></input>
                <label htmlFor="age"> --- age </label>
                <input onChange={setAge} name="age" value={dataMember.age} type="text"></input>
                <select value={dataMember.memberClass} onChange={setClass} name="class">
                    <option value="react">react</option>
                    <option value="java">java</option>
                </select>
                <br />
                <button onClick={addNewMember}>add member</button>
                <button onClick={editMember}>edit member</button>
                <br /><br />
                <label htmlFor="search">search name </label>
                <input onChange={setSearchNameMember} name="search" value={searchName} type="text"></input>
                <button onClick={searchMember}>search</button>
                <br />
                <button onClick={sortMember}>sort age</button>
            </div>
        </div>
    )
}

ReactDOM.render(<div>
    <ListMember />
</div>, divTag);