/**
 * Created by hai.ma on 2015/10/21 0021.
 */
define(["react", "react-dom", "ws", "util", "components/header", "components/section", "components/panel"
        , "components/panel_heading", "components/panel_body", "components/job_list"]
    , function (React, ReactDom, ws, util, Header, Section, Panel, PanelHeading, PanelBody, JobList) {

        return function () {
            ReactDom.render(
                <div>
                    <Header/>
                    <Section>
                        <Panel>
                            <PanelHeading title="Task List"/>
                            <PanelBody>
                                <JobList/>
                            </PanelBody>
                        </Panel>
                    </Section>
                </div>
                , util.view());
        }
    });