<div class="login-modal">
    <div class="header">
        <a class="close-modal-btn" href="javascript:;"><img class="close-modal" src="images/listings/x-icon.jpg"></a>
        <p>Sign In</p>
    </div>
    <div class="content">
        <p class="info">Sign in to your Boston.com/realestate account.</p>
        <input placeholder="Email">
        <input placeholder="Password">
        <button class="save-search-modal-save">Login</button>
    </div>
</div>

<style>
	.login-modal {
		padding: 15px;
		display: none;
	}

	.login-modal .content {
		padding-bottom: 20px;
	}

	.login-modal .info {
		margin-bottom: 15px;
	}

	.login-modal input{
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

	.login-modal__already-user {
		margin-top: 10px;
		text-align: left;
		color: black;
		text-decoration: underline;
	}

	.login-modal textarea {
      height: 85px;
      margin-bottom: 15px;
    }

	.login-modal button {
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