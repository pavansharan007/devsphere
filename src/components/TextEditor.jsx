import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function TextEditor({name,control,label,defaultValue=''}) {

  return (

    <div className='w-full text-white'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || 'content'}
        control = {control}
        render={({field:{onChange}}) => (
            <Editor
            apiKey='qck4n3jtuvgd9e4tp77mlouknbetsubsjx5bu5wkyjxvzmwg'
            initialValue={defaultValue}
            init={
            {
                height: 500,
                menubar: true,
                plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }
            }
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default TextEditor
