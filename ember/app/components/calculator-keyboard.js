import Ember from 'ember';

export default Ember.Component.extend({
  currentExp: '',
  result: '' ,
  screens: Ember.computed('currentExp', 'result', {
    get() {
      return this.get('currentExp') || this.get('result') || 0;
    }
  }),
  newCalculation: 'newCalculation',
  actions: {
    numInput: function(num) {
      this.set('currentExp', this.get('currentExp') + num);
    },
    operatorInput: function(op) {
      const currentExp = this.get('currentExp');
      let newExp = '';
      const expArr = currentExp.split(' ');
      const last = expArr.pop();

      if (op !== '(' && !currentExp.length) {
        alert('Invalid input.');
      } else {
        const doubleOps = last === '' && !/\)\s$/.test(currentExp);
        const incompletePara = op === ')' && last !== '' && !/\(\s/.test(currentExp);
        const invalidLPara = op === '(' && !isNaN(Number(last));
        if (currentExp.length && (doubleOps || incompletePara || invalidLPara)) {
          alert('Invalid input.');
          return;
        }

        if (op === '√') {
          if (last === '') {
            alert('Operation not supported.');
          }
          newExp = expArr.join(' ') + ` ( √ ${last} ) `;
        } else {
          newExp = currentExp + ' ' + op + ' ';
        }
        this.set('currentExp', newExp);

      }
    },
    deleteInput: function() {
      const currentExp = this.get('currentExp');

      const last = currentExp.slice(-1);
      if (!currentExp) {
        this.set('result', '');
      } else if (last === ' ') {
        this.set('currentExp', currentExp.slice(0, -3));
      } else {
        this.set('currentExp', currentExp.slice(0, -1));
      }
    },
    clearInput: function() {
      this.set('currentExp', '');
      this.set('result', '');
    },
    submitInput: function() {
      const currentExp = this.get('currentExp');
      const expArr = currentExp.split(' ');

      let newExp = '';
      let prev = expArr[0];

      for (let i = 1; i < expArr.length; i++) {
        let curr = expArr[i];
        if (curr === '^') {
          prev = expArr[i - 1];
          i++;
          newExp += `Math.pow(${prev}, ${expArr[i]})`;
          curr = '';
        } else {
          newExp += prev;
          if (curr === '√') {
            i++;
            newExp += `Math.sqrt(${expArr[i]})`;
            curr = '';
          }
        }
        prev = curr;
      }
      newExp += prev;

      const val = Math.round(eval(newExp) * 100) / 100;
      const value = {
        input: expArr,
        output: val
      };
      this.sendAction('newCalculation', value);

      this.set('currentExp', String(val));
      this.set('result', val);
    },
    funInput: function() {
      const exps = [
        'I am glad you are having fun!',
        'My name is Cute bot! Nice to meet you!',
        'How fun!'
      ];

      this.set('result', exps[Math.floor(Math.random() * exps.length)]);
      this.set('currentExp', '');
    },
    angryInput: function() {
      const exps = [
        'I am sorry you are tired! Carry on!',
        'Tomorrow is another day!',
        'How sad! You can do it!'
      ];

      this.set('result', exps[Math.floor(Math.random() * exps.length)]);
      this.set('currentExp', '');
    }
  }
});
