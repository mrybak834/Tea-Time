import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class TeaInput extends React.Component {
  state = {
    input: ""
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  render() {
    const { input } = this.state;

    return (
      <Grid container justify="center">
        <div className="container">
          <FormControl className="formControl">
            <InputLabel htmlFor="name-simple">Tea Search</InputLabel>
            <Input
              id="name-simple"
              value={input}
              onChange={this.handleChange}
            />
          </FormControl>
        </div>
      </Grid>
    );
  }
}

export default TeaInput;
