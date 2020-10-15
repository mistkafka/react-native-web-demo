import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import _ from "lodash";
import moment from 'moment';
import img1 from './img/ca-form/hiq_John_Hancock.png';
import img2 from './img/ca-form/hiq_mutual-omaha.png';
import img3 from './img/ca-form/hiq_prudential-7.png';

const SemiboldText = Text;

type Props = {
  vertical: string,
}

type State = {
  form: any,
  errors: any,
  currentUpdateDateField: any,
  submitted: boolean,
  submitting: boolean,
}

const validator = {
  required(msg = 'This field is required!') {
    return (value: string) => {
      if (!value || value.trim() === "") {
        throw Error(msg);
      }

      return true;
    };
  },
  length(len: number, msg = 'Invalid') {
    return (value: string) => {
      value = value.trim();

      if (value.length === len) {
        throw Error(msg);
      }

      return true;
    };
  },
  email(msg = 'Invalid email address') {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (value: string) => {
      value = value.trim();
      if (!re.test(value.toLowerCase())) {
        throw Error(msg);
      }

      return true;
    };
  }
};

const FIELD_METAS = [
  {
    label: "Gender",
    type: "CA-radio",
    name: "gender",
    defaultValue: "f",
    validate: [validator.required()],
    options: [{
      label: "MALE",
      value: "m"
    }, {
      label: "FEMALE",
      value: "f"
    }]
  },
  {
    label: "Do you use tobacco",
    type: "CA-radio",
    name: "use_tobacco",
    defaultValue: "NO",
    validate: [validator.required()],
    options: [{
      label: "YES",
      value: "YES"
    }, {
      label: "NO",
      value: "NO"
    }]
  },
  {
    label: "Health",
    type: "select",
    name: "health",
    options: [{
      label: "Excellent",
      value: "excellent"
    }, {
      label: "Good",
      value: "good"
    }, {
      label: "Average",
      value: "average"
    }]
  },
  {
    label: "Birthday",
    type: "date-select",
    name: "dob",
    placeHolder: "Sep 2, 1987",
    formter: 'MMM D, YYYY',
    validate: [validator.required()],
    minDate: moment().subtract(100, 'year').toDate(),
    maxDate: moment().subtract(18, 'year').toDate()

  },
  {
    label: "Height",
    type: "CA-height",
    validate: [validator.required()],
    name: "height_ft",
    placeHolder: "5",
    unit: 'ft.',
    keyboardType: 'number-pad'
  },
  {
    label: "Weight",
    type: "text",
    name: "weight",
    validate: [validator.required()],
    placeHolder: "100",
    unit: 'lbs.',
    keyboardType: 'numeric'
  },
  {
    label: "Zip Code",
    type: "text",
    name: "zipcode",
    validate: [validator.required()],
    placeHolder: "48604",
    keyboardType: 'number-pad'
  },
  {
    label: "Coverage Amount",
    type: "select",
    name: "coverage_amount",
    options: [
      {
        "label": "$25,000",
        "value": "25000"
      },
      {
        "label": "$50,000",
        "value": "50000"
      },
      {
        "label": "$75,000",
        "value": "75000"
      },
      {
        "label": "$100,000",
        "value": "100000"
      },
      {
        "label": "$125,000",
        "value": "125000"
      },
      {
        "label": "$150,000",
        "value": "150000"
      },
      {
        "label": "$200,000",
        "value": "200000"
      },
      {
        "label": "$250,000",
        "value": "250000"
      },
      {
        "label": "$300,000",
        "value": "300000"
      },
      {
        "label": "$400,000",
        "value": "400000"
      },
      {
        "label": "$500,000",
        "value": "500000"
      },
      {
        "label": "$600,000",
        "value": "600000"
      },
      {
        "label": "$700,000",
        "value": "700000"
      },
      {
        "label": "$750,000",
        "value": "750000"
      },
      {
        "label": "$800,000",
        "value": "800000"
      },
      {
        "label": "$900,000",
        "value": "900000"
      },
      {
        "label": "$1,000,000",
        "value": "1000000"
      },
      {
        "label": "$1,500,000",
        "value": "1500000"
      },
      {
        "label": "$2,000,000",
        "value": "2000000"
      },
      {
        "label": "$3,000,000",
        "value": "3000000"
      },
      {
        "label": "$4,000,000",
        "value": "4000000"
      },
      {
        "label": "$5,000,000",
        "value": "5000000"
      },
      {
        "label": "$10,000,000",
        "value": "10000000"
      }
    ]
  },
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeHolder: "John Smith",
    autoCapitalize: 'words',
    validate: [
      validator.required('Please enter your full name'),
      (name: string) => {
        if (!name.includes(' ')) {
          throw Error('Please enter your full name');
        }

        return true;
      }
    ],
  },
  {
    label: "Type of Insurance",
    type: "select",
    name: "insurance_type",
    options: [
      {
        "label": "Term Life (10-30yrs)",
        "value": "term_life"
      },
      {
        "label": "Whole Life",
        "value": "whole_life"
      }
    ]
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    validate: [validator.required(), validator.email()],
    placeHolder: "johnsmith@email.com",
    keyboardType: 'email-address'
  },
  {
    label: "Annual Household Income",
    type: "select",
    name: "income",
    options: [
      {
        "label": "<$50,000",
        "value": "49999"
      },
      {
        "label": "$50,000 - $75,000",
        "value": "50000"
      },
      {
        "label": "$75,001 - $120,000",
        "value": "75001"
      },
      {
        "label": ">$120,000",
        "value": "120001"
      }
    ]
  },
  {
    label: "Phone",
    type: "text",
    name: "phone",
    validate: [validator.required()],
    placeHolder: "(999) 555-1234",
    keyboardType: 'phone-pad'
  }
];
export default class ConsumersAdvocateForm extends PureComponent<Props, State> {
  submitting: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      form: FIELD_METAS.reduce((_form: any, field) => {
        if (field.defaultValue !== undefined) {
          _form[field.name] = field.defaultValue;
        } else {
          _form[field.name] = "";
          if (field.options) {
            _form[field.name] = field.options[0].value;
          }
        }
        return _form;
      }, {}),
      errors: {},
      currentUpdateDateField: null,
      submitted: false,
      submitting: false,
    };
  }

  render() {
    const { submitted, submitting } = this.state;
    const { vertical } = this.props;
    if (vertical === 'life-insurance') {
      const bottomContent = (
        <View>
          <Text style={styles.disclaimer}>{'By clicking "View Rates", I provide my express written consent for a representative of ConsumersAdvocate or one of its partners to call or text me at the telephone number I provided to discuss buying life insurance. I further agree that ConsumersAdvocate or one of its partners may utilize pre-recorded messages or contact me using autodialer technology. I hereby consent to receive such calls and text messages at the telephone number I designated. I understand that this consent is not a condition of purchase.'}</Text>
          <Text style={{color: '#777777', fontSize: 14}}>{'Working with over 20 top rated carriers such as:'}</Text>
          <View style={styles.partners}>
            <Image source={{uri: img3}} style={{width: 103, height: 21}}/>
            <Image source={{uri: img1}} style={{width: 103, height: 33}}/>
            <Image source={{uri: img2}} style={{width: 103, height: 43}}/>
          </View>
        </View>
      );

      return (
        <View style={styles.wrap}>
          <View style={styles.formTitle}>
            <SemiboldText style={styles.formTitleText}>Compare Life</SemiboldText>
            <SemiboldText style={styles.formTitleText}>Insurance Quotes</SemiboldText>
          </View>
          <View style={styles.contentWrap}>
            { submitted ? this.renderSubmitedHint() : this.renderForm() }
            { submitted ? null : bottomContent }
          </View>
          {submitting && (
            <View style={styles.overlay}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      );
    }
    return null;
  }

  renderSubmitedHint() {
    return (
      <View style={{height: 240}}>
        <SemiboldText style={{marginTop: 20, fontSize: 20, color: "#212529", textAlign: "center"}}>Finished!</SemiboldText>
        <SemiboldText style={{marginTop: 50, fontSize: 24, color: "#212529", textAlign: "center"}}>Thank You!</SemiboldText>
        <Text style={{marginTop: 8, fontSize: 16, color: "#212529", textAlign: "center"}}>{"We'll be in touch"}</Text>
      </View>
    );
  }

  renderForm() {
    const rows = _.chunk(FIELD_METAS, 2);

    return (
        <View style={styles.form}>
          { rows.map((row, index) => this.renderRow(row, index.toString())) }
          <View key="action-row" style={styles.actionRow}>
            <Button
                title={"View Rates"}
                color={'white'}
                onPress={() => this.submit()}
            />
          </View>
          { this.renderDatePicker() }
        </View>
    );
  }

  renderRow(fields: Array<any>, key: string) {
    const columnCount = fields.length;
    const shouldAddGap = columnCount > 1;
    const items = fields.map((field, index) => this.renderFormItem(field, shouldAddGap, index + 1 === columnCount));
    return (
      <View key={key} style={styles.row}>
        { _.flatten(items) }
      </View>
    );
  }

  renderDatePicker() {
    const { currentUpdateDateField, form } = this.state;
    if (!currentUpdateDateField) {
      return null;
    }
    let chooseDate: Date = new Date();
    const chooseDateStr = form[currentUpdateDateField.name];
    if (chooseDateStr) {
      chooseDate = moment(chooseDateStr, 'MMM D, YYYY').toDate();
    }
    return (
      <View key={"date-picker-row"}>
      </View>
    );
  }

  renderFormItem(field: any, shouldAddGap: boolean, isLastFormItem: boolean) {
    const result = [];
    const { errors } = this.state;
    const err = errors[field.name];
    const formItem = (
      <View key={field.name} style={styles.fieldWrap}>
        <SemiboldText style={styles.fieldLabel}>{field.label}</SemiboldText>
        { this.renderField(field) }
        { err && <Text style={styles.fieldErrMsg}>{ err.message }</Text> }
      </View>
    );
    result.push(formItem);

    if (shouldAddGap && !isLastFormItem) {
      const key = field.name + "-gap";
      const gapElement = (
        <View key={key} style={styles.fieldGap} />
      );
      result.push(gapElement);
    }
    return result;
  }

  renderField(field: any) {
    const value = this.state.form[field.name];
    switch (field.type) {
      case 'text':
        return this.renderFieldText(field, value);
      case 'select':
        return this.renderFieldSelect(field, value);
      case 'date-select':
        return this.renderFieldDatePicker(field, value);

      case 'CA-radio':
        return this.renderFieldCARadio(field, value);
      case 'CA-height':
        return this.renderFieldCAHeight(field);
      default:
        return this.renderFieldText(field, value);
    }
  }

  renderFieldText(field: any, value: any) {
    const err = this.state.errors[field.name];
    const errorStyle = err ? styles.fieldCommonBgStyleError : {};

    return (
      <View style={[styles.fieldCommonBgStyle, styles.fieldText, errorStyle]}>
        <TextInput
          style={[styles.fieldCommonTextStyle, styles.fieldTextInput]}
          value={value}
          placeholder={field.placeHolder}
          placeholderTextColor={"#868e96"}
          onBlur={() => this.validateField(field, this.state.form[field.name])}
          onChangeText={text => this.updateFormByField(field, text)}
          autoCapitalize={field.autoCapitalize || 'none'}
          keyboardType={field.keyboardType || 'default'}
        />
        { field.unit && <Text style={[styles.fieldCommonTextStyle, styles.fieldTextUnit]}>{field.unit}</Text> }
      </View>
    );
  }

  renderFieldCARadio(field: any, value: any) {
    const optCount = field.options.length;
    const items = field.options.map((opt: any, index: number)=> {
      const result = [];

      const isSelected = opt.value === value;
      const style: any[] = [styles.fieldCommonBgStyle, {paddingTop: 8, paddingBottom: 8, flex: 1}];
      if (isSelected) {
        style.push(styles.fieldCARadioOptionSelected);
      }
      const radioOpt = (
        <TouchableWithoutFeedback
          key={`${opt.value}`}
          onPress={() => this.updateFormByField(field, opt.value)}
        >
          <View style={style}>
            <SemiboldText style={[styles.fieldCommonTextStyle, styles.fieldCARadioOption]}>{opt.label}</SemiboldText>
          </View>
        </TouchableWithoutFeedback>
      );
      result.push(radioOpt);

      const isLastElement = index + 1 === optCount;
      const shouldAddGap = optCount > 1 && !isLastElement;
      if (shouldAddGap) {
        const gapElement = (
          <View style={styles.fieldCARadioOptionGap} key={`${opt.value}-gap`}/>
        );
        result.push(gapElement);
      }

      return result;
    });

    return (
      <View style={styles.fieldCARadio}>
        { _.flatten(items) }
      </View>
    );
  }

  renderFieldSelect(field: any, value: any) {
    const selectedOpt = field.options.filter((opt: any) => opt.value === value)[0];

    const showOptions = () => {
      const items = field.options.map((opt: any) => {
        return {
          title: opt.label,
          action: () => this.updateFormByField(field, opt.value),
          value: opt.value,
        };
      });
    };

    return (
      <TouchableWithoutFeedback
        onPress={showOptions}
      >
        <View style={[styles.fieldCommonBgStyle, styles.fieldSelect]}>
          <Text
            style={[styles.fieldCommonTextStyle, styles.fieldSelectText]}
          >{ selectedOpt.label }</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderFieldDatePicker(field: any, value: any) {
    const displayValue = value || field.placeHolder;
    const placeHolderStyle: any = {};
    if (!value) {
      placeHolderStyle.color = '#868e96';
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => this.toUpdateDate(field)}
      >
        <View style={[styles.fieldCommonBgStyle]}>
          <Text
            style={[styles.fieldCommonTextStyle, placeHolderStyle]}
          >{ displayValue }</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderFieldCAHeight(field: any) {
    const { form } = this.state;

    const ftHeightField = {
      ...field,
      name: 'height_ft',
      unit: 'ft.'
    };
    const ftHeight = this.renderFieldText(ftHeightField, form['height_ft']);

    const inHeightField = {
      ...field,
      name: 'height_in',
      unit: 'in.',
      placeHolder: '10'
    };
    const inHeight = this.renderFieldText(inHeightField, form['height_in']);

    return (
      <View style={styles.fieldCAHeight}>
        <View style={{flex: 1}}>{ ftHeight }</View>
        <View style={{width: 3}} />
        <View style={{flex: 1}}>{ inHeight }</View>
      </View>
    );
  }

  updateFormByField(field: any, val: any) {
    this.setState({
      form: {
        ...this.state.form,
        [field.name]: val
      }
    });
  }

  updateErrorsByField(field: any, err: any) {
    this.setState({
      errors: {
        ...this.state.errors,
        [field.name]: err
      }
    });
  }

  toUpdateDate(field: any) {
    if (this.state.currentUpdateDateField) {
      return;
    }
    this.setState({
      currentUpdateDateField: field
    });
  }

  updateDate(date: any) {
    if (!this.state.currentUpdateDateField) {
      return;
    }

    if (date !== null) {
      const dateStr =  moment(date).format('MMM D, YYYY');
      this.updateFormByField(this.state.currentUpdateDateField, dateStr);
    }

    this.setState({
      currentUpdateDateField: null
    });
  }

  validateForm() {
    const validatePromises = FIELD_METAS.map(field => {
      const value = this.state.form[field.name];
      return this.validateField(field, value, true);
    });

    return Promise.all(validatePromises)
      .then(results => {

        let valid = true;
        const newErrors = results.reduce((errors, result) => {
          if (result.error !== null) {
            valid = false;
          }
          errors[result.fieldName] = result.error;
          return errors;
        }, {});

        this.setState({
          errors: newErrors
        });

        return valid;
      });
  }

  validateField(field: any, value: any, isBatchMode: boolean = false) {
    const validate = field.validate || [];
    const p = validate.reduce((_p: Promise<any>, validateFn: Function) => {
      // execute validate rules one by one
      _p = _p.then(() => {
        return validateFn(value);
      });

      return _p;
    }, Promise.resolve());

    return p
      .catch((err: any) => {
        return err;
      })
      .then((result: any) => {
        let err = null;
        if (result instanceof Error) {
          err = result;
        }
        if (!isBatchMode) {
          this.updateErrorsByField(field, err);
          return true;
        } else {
          return {
            fieldName: field.name,
            error: err
          };
        }
      });
  }

  async submit() {
    const { vertical } = this.props;
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    const isValid= await this.validateForm();
    if (!isValid) {
      this.submitting = false;
      return;
    }

    const form = _.cloneDeep(this.state.form);
    for (const [key, val] of Object.entries(form)) {
      if (typeof val === 'string') {
        form[key] = val.trim();
      }
    }

    let height = Number.parseInt(form.height_in);
    height = height + Number.parseInt(form.height_ft) * 12;
    form.height = height;
    delete form.height_ft;
    delete form.height_in;

    form.weight = Number.parseInt(form.weight);

    form.dob = moment(form.dob, 'MMM D, YYYY').format('MM/DD/YYYY');
    form.use_tobacco = form.use_tobacco === 'YES';

    this.setState({
      submitting: true,
    });
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    backgroundColor: '#d2d7fd',
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
  },
  formTitle: {
    padding: 15,
  },
  formTitleText: {
    fontSize: 21,
    textAlign: 'center',
    color: '#1d1b23'
  },
  contentWrap: {
    backgroundColor: 'white',
    padding: 7
  },
  disclaimer: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  partners: {
    marginTop: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  form: {},
  row: {
    flexDirection: 'row',
    paddingBottom: 16
  },
  fieldGap: {
    width: 10
  },
  fieldWrap: {
    flex: 1,
  },
  fieldLabel: {
    paddingBottom: 8,
    fontSize: 13,
    lineHeight: 15,
    color: '#333333'
  },
  fieldErrMsg: {
    marginTop: 3,
    color: 'red',
    fontSize: 12,
  },
  actionRow: {},
  submitBtn: {
    backgroundColor: '#5b62d2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
  },
  fieldCommonBgStyle: {
    backgroundColor: '#dddddd',
    borderRadius: 4,
    borderColor: '#dddddd',
    borderWidth: 1
  },
  fieldCommonBgStyleError: {
    borderColor: 'red',
  },
  fieldCommonTextStyle: {
    color: '#000000',
    fontSize: 13,
    lineHeight: 13,
    padding: 8
  },
  fieldText: {
    flexDirection: 'row',
    // flex: 1,
  },
  fieldTextInput: {
    flex: 1,
  },
  fieldTextUnit: {
    color: 'white',
    paddingLeft: 5
  },
  fieldCARadio: {
    flexDirection: 'row'
  },
  fieldCARadioOption: {
    color: '#ffffff',
    textAlign: 'center',
  },
  fieldCARadioOptionGap: {
    width: 10
  },
  fieldCARadioOptionSelected: {
    backgroundColor: '#5b62d2'
  },
  fieldSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  fieldSelectText: {
    flex: 1,
    paddingRight: 5
  },
  fieldSelectArrow: {
    tintColor: "black",
    width: 10,
    height: 5,
    transform: [{
      rotate: '180deg'
    }],
  },
  fieldCAHeight: {
    flexDirection: 'row',
  }
});
