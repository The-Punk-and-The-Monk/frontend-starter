import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

class RichEditor extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadEditor();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.defaultDetail !== nextProps.defaultDetail){
      this.simditor.setValue(nextProps.defaultDetail)
    }
  }

  loadEditor() {
    const elem = this.refs['textarea'];
    this.simditor = new Simditor({
      textarea: $(elem),
      defaultValue: this.props.placeholder || "请输入内容",
      upload: {
        url: "/manage/product/richtext_img_upload.do",
        defaultImage: "",
        fileKey: "upload_file"
      }
    })
    this.bindEditorEvent();
  }

  bindEditorEvent = () => {
    this.simditor.on('valuechanged', e => {
      this.props.onValueChange(this.simditor.getValue())
    })
  }

  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default RichEditor