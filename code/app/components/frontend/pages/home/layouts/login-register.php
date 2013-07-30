	<?php defined( '_CEXEC' ) or die( 'Restricted access' ); ?>
  <div class="front-signin js-front-signin">
    <form method="post" class="signin" action="<?php echo Config::get('base_url') . '/?case=login' ?>">
      <div class="placeholding-input username">
        <label class="placeholder" for="signin-email">Email</label>
        <input type="text" tabindex="1" autocomplete="on" title="Email" name="email" class="text-input email-input" id="signin-email">
      </div>
      <div class="placeholding-input password flex-table-form">
        <label class="placeholder" for="signin-password">Password</label>
        <input type="password" tabindex="2" title="Password" name="password" class="text-input flex-table-input" id="signin-password">
      </div>
      <div class="remember-forgot">
        <label class="remember">
          <input type="checkbox" tabindex="3" name="remember_me" value="1">
          <span>Remember me</span>
        </label>
        <a href="/account/resend_password" class="forgot">Forgot password?</a>
      </div>
      <button tabindex="4" class="submit btn primary-btn flex-table-btn js-submit" type="submit">
        Sign in
      </button>
    
      <input type="hidden" value="/" name="redirect_after_login">
    </form>
  </div>
  
  <div class="front-signup js-front-signup">
    <h2>Sign up</h2>
  
    <form method="post" class="signup" action="https://twitter.com/signup">
      <div class="placeholding-input">
        <label class="placeholder" for="signup-user-name">Full name</label>
        <input type="text" maxlength="20" name="user[name]" autocomplete="off" class="text-input" id="signup-user-name">
      </div>
      <div class="placeholding-input">
        <label class="placeholder" for="signup-user-email">Email</label>
        <input type="text" name="user[email]" autocomplete="off" class="text-input email-input" id="signup-user-email">
      </div>
      <div class="placeholding-input">
        <label class="placeholder" for="signup-user-password">Password</label>
        <input type="password" name="user[user_password]" class="text-input" id="signup-user-password">
      </div>
  
      <input type="hidden" name="context" value="">
      <button class="btn signup-btn" type="submit">
        Sign up
      </button>
    </form>
  </div>
  
	<script type="text/javascript" src="<?php echo Template::getBaseUrl() . '/js/mybooks-login-register.js' ?>"></script>
  <script type="text/javascript">
		var mybooks = new MyBooks(<?php echo json_encode(Storage::get('settings')) ?>);
	</script>