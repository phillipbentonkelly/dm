<div class="register-modal">
    <div class="header">
        <a class="close-modal-btn" href="javascript:;"><img class="close-modal" src="images/listings/x-icon.JPG"></a>
        <p>Register</p>
    </div>
    <div class="content">
        <p class="info">Sign up for your Boston.com/realestate account.</p>
        <input placeholder="Email">
        <input placeholder="Password">
        <input placeholder="Confirm Password">
        <button class="save-search-modal-save">Register</button>
        <a href="javascript:;"><p class="register-modal__already-user">Already a User?</p></a>
    </div>
</div>

<style>
	.register-modal {
		padding: 15px;
		display: none;
	}

	.register-modal .content {
		padding-bottom: 20px;
	}

	.register-modal .info {
		margin-bottom: 15px;
	}

	.register-modal input{
      display: inline-block;
      font-family: OpenSans Regular;
      color: rgba(0, 0, 0, 0.5);
      font-size: 13px; /* Approximation due to font substitution */
      font-weight: 400;
      text-align: left;
      width: 100%;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #A0A0A0;
      box-sizing: border-box;
    }

	.register-modal__already-user {
		margin-top: 10px;
		text-align: left;
		color: black;
		text-decoration: underline;
	}

	.register-modal textarea {
      height: 85px;
      margin-bottom: 15px;
    }

	.register-modal button {
	  padding: 5px 15px;
	  background: black;
	  color: white;
	  border: none;
	  border-radius: 2px;
	  font-family: 'OpenSans Regular', sans-serif;
	  font-weight: 300;
	  font-size: 105%;
	  float: right;
	}
</style>