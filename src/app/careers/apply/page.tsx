export default function Apply() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>APPLY</h1>
        <form>
          <label htmlFor="input1"></label>
          <input type="text" id="input1" name="input1" /><br /><br />
  
          <label htmlFor="input2"></label>
          <input type="text" id="input2" name="input2" /><br /><br />
  
          <label htmlFor="input3"></label>
          <input type="text" id="input3" name="input3" /><br /><br />
  
          <label htmlFor="input4"></label>
          <input type="text" id="input4" name="input4" /><br /><br />
  
          <input type="submit" value="Submit" />
        </form>
      </main>
    );
  }
  