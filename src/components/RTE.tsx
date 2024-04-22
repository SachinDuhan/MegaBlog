import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name, control, label, defaultValue=""}:{[key:string]:any}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
      name={name}
      control={control}
      render={({field: {onChange}})=> (
        <Editor
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        licenseKey=''
        initialValue={defaultValue}
        init={{
            height: 500,
            menubar: true,
            plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
            ],
            toolbar: "undo redo | blocks | image | bold italic \
            forecolor | alignleft aligncenter alignright \
            alignjustify | bullist numlist outdent indent |\
            removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
      )}
      />
    </div>
  )
}

export default RTE
