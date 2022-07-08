import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
import { baseURL } from '../../../apis/axiosClient';
const EditorComponent = (props)=>{
  const [nameState , setNameState] = useState(props);
   useEffect(() => {
       setNameState(props);
   }, [props])
  return(     <Editor
    value={props.data||''}
    onEditorChange={props.changeEditor}
    init={{
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright |image code',
      images_upload_url: 'localhost:8080/api/file',
      images_upload_handler:(blobInfo, success, failure)=>{
        const formData = new FormData();
        formData.append('file', blobInfo.blob());
        Axios.post('http://localhost:8080/api/file',formData).then(res=>{
           success(baseURL + res.data.link);
      }).catch(err=>{failure(err);});
      },
      height:props.height
    }}
  
  />);
}
export default EditorComponent;
