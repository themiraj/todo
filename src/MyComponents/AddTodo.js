import React, {useState,useEffect} from 'react';
    

export const AddTodo = ({addTodo,getValue,OnUpdate}) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [sno, setSno] = useState("");
    const [flag,setflag] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if(!title || !desc){
            alert("Title or description canot be blank");
        }else{
            addTodo(title,desc);
            setTitle("");
            setDesc("");
        }
    }
    const Updatehadler = (e) => {
        e.preventDefault();
        OnUpdate(sno,title,desc);
            setflag(false);
            setSno("");
            setTitle("");
            setDesc("");
    }
    useEffect( () => {
        setflag(getValue.flag ? getValue.flag : false);
        setSno(getValue.sno);
        setTitle(getValue.title);
        setDesc(getValue.desc);
    },[getValue])
    console.log(flag)
    return (
        <div className="container my-3">
            <h3>Add a Todo</h3>
                <form onSubmit={flag == false ? submit : Updatehadler}>
                    <input type="hidden" value={sno || ''}/>   
                    <div className="mb-3">
                        <label htmlFor="title">Todo Title</label>
                        <input type="text" value={title || ''} onChange={(e)=>setTitle(e.target.value)} className="form-control" id="title" placeholder="Todo Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc">Todo Description</label>
                        <input type="text" value={desc || ''} onChange={(e)=>setDesc(e.target.value)} className="form-control" id="desc" placeholder="Todo Description" />
                    </div>
                    <button type="submit" className={flag == false ? 'btn btn-sm btn-success' : 'btn btn-sm btn-info text-light'}>{flag == false ? 'Add Todo' : 'Update' }</button>
                </form>
        </div>
    )
}
