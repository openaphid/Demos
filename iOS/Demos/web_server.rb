=begin
Copyright 2012 Aphid Mobile

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
=end

require "webrick"
require "socket"

if __FILE__ == $0
	path = (ARGV[0] and File.directory?(ARGV[0])) ? ARGV[0] : Dir.pwd
	port = (ARGV[1] and ARGV[1].to_i > 0 and ARGV[1].to_i < 65535) ? ARGV[1].to_i : 18080

	if path and port
		puts "Serving #{File.expand_path(path)} on port #{port}\n"

		puts "The 'baseURL' for your game may be http://#{IPSocket.getaddress(Socket.gethostname)}:#{port}\n\n"

		server = WEBrick::HTTPServer.new(
			:Port => port,
			:DocumentRoot => path
		)
		trap("INT"){server.shutdown}
		server.start
	else
		puts "Usage: ruby web_server.rb [doc-root] [port]"
		puts "\tdoc-root: the root directory to serve (optional, default is the current directory)"
		puts "\tport: the port over which to serve the content (optional, default is 18080)"
	end
end
