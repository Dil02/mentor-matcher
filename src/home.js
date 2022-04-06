import './Home.css';

function Home() {
    return (
        <div className = "bg-info">
            <div className="main">
                <div className="container">
                    <span className="text1">Welcome to </span>
                        <img className= "fdmgif" src="fdmlogo.gif"/>
                        <br/><br/><br/>
                    <span className="text1">mentor matcher</span>
                </div>

            </div>
            <section id="about" className="about_text">
                <aside className="about_right">
                    <h4 className="about_title">ABOUT US</h4><br/>
                    <div className="fdminfo">FDM’s technical consultants work within our clients IT teams to support complex projects and to provide solutions to business problems.
                        Our consultants are trained to the highest standards and work across the software development lifecycle including design, development,
                        testing, analysis and maintenance as well as providing ongoing support. Our people combine technical excellence with strong interpersonal
                        skills and work in some of the most demanding and challenging environments. We provide ongoing professional and technical support for all
                        of our consultants to help with their personal development and to ensure we offer a seamless service to our clients. Our diverse talent pools,
                        combined with the ability to transfer FDM consultants to permanent in-house resources, means our clients can benefit from a range of experiences
                        and technical skills in the creation of their own balanced teams.</div>
                </aside>
                <aside className="left">
                    <img src="pic1.png" className="pic1"/>
                </aside>
            </section>
            <section className="faqs_text">
                <h4 id="faqs">FAQs</h4>
                <div className="review"> Review our frequently asked questions and find support here.</div>
                <h5>  What is FDM Mentor Matcher?</h5>
                <div> FDM Group is a global leader in the recruit, train, deploy sector. Our mission is to bring people and technology together,
                    creating and inspiring exciting for our users. The FDM Matcher allows a mentee to be matched up with a mentor based on the their
                    goals and preferences. We help individuals to find mentors and mentees, network with relevant professionals, connect and develop and grow their careers. </div>
                <h5>  How do you match mentors?</h5>
                <div> We use lots of profile data from each person who joins us, such as location, industry and experienceand the areas in which each mentor and mentee are looking
                    to offer and seek support. We recommend up to five potential matches for each member and members can either accept the suggested matches or decline any recommended
                    matches that don't seem quite right. We then use matches and dismissed recommendations to improve our matching, through machine learning.</div>
                <h5>  What is mentoring?</h5>
                <div> We believe that mentoring is simply one professional aiding and assisting another professional in any capacity. Mentoring could take as
                    basic a form as sitting with a professional for 20 minutes to discuss a challenge they are facing or even as discuss the week's professional progress,
                    job promotions, internal office politics and reaching career goals. Mentoring, put quite simply, is helping.</div>
                <h5>  Who can be a mentor?</h5>
                <div> Almost everyone is ultimately capable of being a mentor. Anyone who believes they have experience or insight and can offer valuable
                    support and advice to another individual can be a mentor!</div>
                <h5>  What are the benefits to mentoring?</h5>
                <div><b>Benefits to being a mentor include:</b> The opportunity to improve interpersonal skills and understand other departments and roles.<br/>
                    <b>Benefits to being a mentee include:</b> The opportunity to learn and grow their career, develop self-confidence, skills and knowledge and have a better understanding of organisational culture.</div>
                <h5>  Can I close my account?</h5>
                <div> When you are logged into your account you can request for your account to be deleted. Once it has been approved by the System Admin it will be officially deleted.</div>

            </section>

            

            <footer>
                <br/>
                <a href="https://www.fdmgroup.com/"><img src="fdm_logo.png" alt="fdm" className="logo1"/></a>&emsp;
                <a href="https://www.instagram.com/fdm_group/"><img src="insta_logo.png" alt="Instagram" className="logo2"/></a>&emsp;
                <a href="https://www.facebook.com/FDMGroup/"><img src="fb_logo.png" alt="facebook"className="logo3"/></a>
                <br/>
                <br/>
                <strong>GROUP 14 - MENTOR MATCHING APP</strong><a> &copy; 2022</a>
            </footer>
        </div>
    );
}

export default Home;