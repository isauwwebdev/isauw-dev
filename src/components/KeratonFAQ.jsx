import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import React from 'react'
import questions from '../data/keraton-FAQ.json';

function KeratonFAQ() {  
    const questionItems = questions.map((item) => {
        return (
            <Item item={item}/>
        )
    }) 
    return (
        <div className="keraton-faq" style={{ "background-color": "#031B28" }}>
            <Container>
                <h1 className="py-3 keraton-section-header">Frequently Asked Questions</h1>
                <Accordion defaultActiveKey="0" flush className="keraton-faq-accordion">
                    {questionItems}
                </Accordion>
            </Container>
        </div>
    )
}

function Item(props) {
    const { item } = props;
    const isFive = item.id === 5;
    return (
        <Accordion.Item eventKey={String(item.id)} className="keraton-faq-item">
            <Accordion.Header className="keraton-faq-item-header">{item.question}</Accordion.Header>
            <Accordion.Body className="keraton-faq-item-body">{item.answer}<p></p>   <a href={item.link} target="_blank"><img src={item.icon} style={{width:"5%"}}></img></a></Accordion.Body>
        </Accordion.Item>
    )
}

export default KeratonFAQ