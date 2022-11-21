import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




const Bcom = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [data, setData] = useState();
 
    const [DelShow, setMDelShow] = useState(false);
    const [ModifyShow, setModifyShow] = useState(false);
    const [show, setShow] = useState(false);

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const DelClose = () => setMDelShow(false);
    const DeShow = () => setMDelShow(true);

    const MdClose = () => setModifyShow(false);
    const MdShow = () => setModifyShow(true);





    return (
        <div>
            <table style={{
                width:"1080px",
                border:"1px",
                solid:"#fffff",
                // backgroundColor:'#bdc3c7'
            }}>
                <tr style={{backgroundColor:'#bdc3c7'}}>
                    <td>
                    <Checkbox {...label} defaultChecked />
                    </td>
                    <td>
                        <strong>아이디</strong>
                    </td>
                    <td>
                        <strong>비밀번호</strong>
                    </td>
                    <td>
                        <strong>사용자명</strong>
                    </td>
                    <td>
                        <strong>권한</strong>
                    </td>
                </tr>  
       
                    

                  {
                        data && data.map((e, idx) =>
                        <tr >
                            <td><Checkbox {...label} defaultChecked /></td>
                            <td>아이디 넣을거</td>
                            <td>비번</td>
                            <td>사용자 머시기 받아올거</td>
                            <td>권한 머시기</td>
                        </tr>
                        )
                    }

                    
             

            </table>
            <Button variant="primary" onClick={handleShow}>
                추가
            </Button>

            <Button variant="primary" onClick={MdShow}>
                수정
            </Button>

            <Button variant="primary" onClick={DeShow}>
               삭제
            </Button>

            {/* 추가 */}
            <Modal 
             centered
             size="lg"
            show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>추가!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                   추가
                </Button>
                </Modal.Footer>
            </Modal>

            {/* 수정 */}
            <Modal 
             centered
             size="lg"
            show={ModifyShow} onHide={MdClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>수정</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={MdClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={MdClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 */}
            <Modal 
             centered
             size="lg"
            show={DelShow} onHide={DelClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제 내용</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={DelClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={DelClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

       




        </div>
    );
};

export default Bcom;