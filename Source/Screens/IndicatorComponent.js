import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { ViewPager } from 'rn-viewpager';

import StepIndicator from 'react-native-step-indicator';

import PersonalInfo from './PersonalInfo';
import BillingInfo from './BillingInfo';
import ProfessionalInfo from './ProfessionalInfo';



const firstIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 3,
    stepStrokeWidth: 0,
    stepStrokeCurrentColor: 'orange',
    currentStepStrokeWidth: 3,
    separatorFinishedColor: 'orange',
    separatorUnFinishedColor: '#ffc57f',
    stepIndicatorFinishedColor: 'orange',
    stepIndicatorUnFinishedColor: '#ffc57f',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: 'orange'
}

export default class IndicatorComponent extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 0,
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage != this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

    render() {
        const USER_EMAIL = this.props.navigation.getParam('USER_EMAIL', 'test email', 'USER_ID', 'NO_ID');
        // console.log("UsEr EmAiL:::" + USER_EMAIL); 
        // console.log("UsEr Id:::" + USER_ID); 
        const PAGES = [
            <PersonalInfo
                USER_EMAIL = {()=> USER_EMAIL}
                USER_ID = {() => USER_ID}
                onNextPressed={() => this.viewPager.setPage(1)}
            />,
            <BillingInfo
                onNextPressed={() => { this.viewPager.setPage(2) }}
                onPrevPressed={() => { this.viewPager.setPage(0) }}
            />,
            <ProfessionalInfo
                onNextPressed={() => { console.log("pressed successfully...") }}
                onPrevPressed={() => { this.viewPager.setPage(1) }}
            />
        ];
        return (
            <View style={styles.container}>
                <View style={styles.stepIndicator}>
                    <StepIndicator customStyles={firstIndicatorStyles}
                        currentPosition={this.state.currentPage}
                        labels={["Profile", "Billing\nDetails", "Professional\nDetails"]}
                        stepCount={3} />
                </View>
                <ViewPager
                    style={{ flexGrow: 1 }}
                    ref={(viewPager) => { this.viewPager = viewPager }}
                    onPageSelected={(page) => { this.setState({ currentPage: page.position }) }}
                >
                    {/* <View>
                        {[<PersonalInfo onNextPressed={() => this.viewPager.setPage(1)} />,
                        <BillingInfo />,
                        <ProfessionalInfo />]}
                    </View> */}

                    {PAGES.map((page) => this.renderViewPagerPage(page))}
                </ViewPager>
            </View>
        );
    }

    renderViewPagerPage = (data) => {
        return (
            <View>
                <View>{data}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginVertical: 10,
    },
});