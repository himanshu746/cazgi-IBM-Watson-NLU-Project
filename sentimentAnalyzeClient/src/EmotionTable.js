import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        const data = Object.entries(this.props.emotions);
        console.log(data);
      return (
          
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                data.map(emotion => (
                    <tr key={emotion[0]}>
                        <td>{emotion[0]}</td>
                        <td>{emotion[1]}</td>
                    </tr>
                ))
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
